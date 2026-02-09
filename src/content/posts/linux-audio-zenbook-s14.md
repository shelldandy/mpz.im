---
title: Fixing Audio on the ASUS Zenbook S 14 (Lunar Lake) on Linux
date: 2026-02-08
---

# Fixing Audio on the ASUS Zenbook S 14 (Lunar Lake) on Linux

The ASUS Zenbook S 14 (UX5406SA) has a quad-speaker Harman/Kardon setup driven by a Cirrus Logic CS42L43 codec and four CS35L56 amplifiers over SoundWire. On Windows, Dolby Atmos does the heavy lifting to make these speakers sound great. On Linux, you're on your own — and out of the box, the experience ranges from "no sound" to "flat mono from one pair of speakers."

Here's everything I had to do to get proper audio working on Arch Linux with PipeWire.

## The Hardware Problem

The Lunar Lake audio stack uses Intel SOF firmware talking to the CS42L43 codec via SoundWire. Two things go wrong at the ALSA level:

1. **Speaker switches default to OFF.** The ALSA UCM `EnableSequence` doesn't trigger the CS42L43's speaker playback and digital switches during init. Result: flat, mono-sounding audio from only some of the speakers.

2. **Headphone jack detection is broken.** The CS42L43's impedance detection fails because of missing voltage regulators (it falls back to a dummy regulator). The kernel sees a physical insertion but can't identify the device type, so audio keeps playing through speakers.

Both issues also resurface after suspend/resume.

## Fix 1: Speaker Switches

The fix is simple — force the ALSA controls on:

```bash
amixer -c "$CARD" cset name='cs42l43 Speaker Playback Switch' on,on
amixer -c "$CARD" cset name='cs42l43 Speaker Digital Switch' on,on
```

Where `$CARD` is the CS42L43 card number, found dynamically:

```bash
CARD=$(grep -l cs42l43 /proc/asound/card*/id | head -1 | grep -oP 'card\K[0-9]+')
```

This runs via a systemd oneshot service at boot (after `sound.target` and `alsa-restore`) and again on resume from suspend.

## Fix 2: Headphone Jack Override

Same idea — force the jack type:

```bash
amixer -c "$CARD" cset name='cs42l43 Jack Override' 'Headphone'
```

I also reset the headphone digital volume to prevent corruption that can happen after kernel updates:

```bash
amixer -c "$CARD" cset name='cs42l43 Headphone Digital Volume' 159,159
```

This also runs at boot (with a 2-second delay for hardware init and retry logic) and on resume. A third trigger runs it after Hyprland monitor profile switches, since audio routing can get confused during those.

## Fix 3: Making the Speakers Sound Good

With the switches enabled, audio works — but it sounds noticeably worse than on Windows. That's because Windows has Dolby Atmos processing the output in real-time, tuned for this specific speaker arrangement.

On Linux, we can approximate this using [EasyEffects](https://github.com/wwmm/easyeffects) and its Convolver plugin with Dolby impulse response files. Credit to [blog.helgesson.dev](https://blog.helgesson.dev/laptop-audio) for documenting this approach.

### Getting the IR Files

The Dolby impulse response files come in a zip with several profiles:

- `music-balanced.irs` — general purpose, good default
- `movie.irs` — emphasis on spatial audio
- `game.irs` — tuned for positional cues
- `voice.irs` — speech clarity
- `none.irs` — reference/bypass

I put these in `~/.local/share/easyeffects/irs/`.

### EasyEffects Preset

Create an output preset that loads the Convolver with your chosen IR. Mine uses `music-balanced`:

```json
{
  "output": {
    "blocklist": [],
    "plugins_order": ["convolver"],
    "convolver": {
      "bypass": false,
      "input-gain": 0.0,
      "output-gain": 0.0,
      "kernel-name": "music-balanced",
      "ir-width": 100,
      "autogain": false
    }
  }
}
```

Save as `~/.local/share/easyeffects/output/Dolby.json`.

I also created a `Passthrough.json` with an empty `plugins_order` for headphones — no point processing audio that's already going to proper drivers.

### Auto-switching Between Speaker and Headphone Presets

EasyEffects supports autoloading presets based on the active output device. Create files in `~/.local/share/easyeffects/autoload/output/` named after the PipeWire sink and profile:

**For speakers** (`alsa_output.pci-0000_00_1f.3-platform-sof_sdw.HiFi__Speaker__sink:[Out] Speaker.json`):

```json
{
  "device": "alsa_output.pci-0000_00_1f.3-platform-sof_sdw.HiFi__Speaker__sink",
  "device-description": "Lunar Lake-M HD Audio Controller Speaker",
  "device-profile": "[Out] Speaker",
  "preset-name": "Dolby"
}
```

**For headphones** (`alsa_output.pci-0000_00_1f.3-platform-sof_sdw.HiFi__Headphones__sink:[Out] Headphones.json`):

```json
{
  "device": "alsa_output.pci-0000_00_1f.3-platform-sof_sdw.HiFi__Headphones__sink",
  "device-description": "Lunar Lake-M HD Audio Controller Headphones",
  "device-profile": "[Out] Headphones",
  "preset-name": "Passthrough"
}
```

Now when you plug in headphones, EasyEffects automatically drops the convolver processing. Unplug, and the Dolby profile kicks back in.

## The Full Stack

Here's what the complete audio fix looks like across the system:

| Layer       | What                              | Why                                            |
| ----------- | --------------------------------- | ---------------------------------------------- |
| Kernel/ALSA | Speaker switch override (systemd) | UCM doesn't enable switches                    |
| Kernel/ALSA | Jack detection override (systemd) | Impedance detection fails                      |
| PipeWire    | SOF firmware + UCM topology       | Routes audio to the right amps                 |
| EasyEffects | Convolver with Dolby IRs          | Software replacement for Dolby Atmos           |
| EasyEffects | Autoload presets                  | Speaker gets Dolby, headphones get passthrough |

Everything is managed through dotfiles with GNU Stow, so a fresh install is just `make stow` plus enabling two systemd services.

## Gotchas

- **Kernel regressions are real.** Kernel 6.17.8 broke audio entirely on this hardware — I had to pin 6.17.7 until 6.17.9 landed. Keep an older kernel around.
- **Speaker noise above 80% volume** was a known issue fixed in kernel 6.15-rc5+. If you're on an older kernel, don't crank it.
- **`asound.state` corruption** can happen. If audio suddenly sounds wrong after an update, delete `/var/lib/alsa/asound.state` and reboot to let it regenerate.
- **EasyEffects 8.x** stores data in `~/.local/share/easyeffects/`, not `~/.config/easyeffects/`. Older guides may point you to the wrong path.

## Was It Worth It?

Honestly, yes. The difference with the convolver active is immediately noticeable — the speakers go from sounding like a cheap laptop to actually having some depth and separation. It's not Windows Dolby Atmos, but it's close enough that I stopped noticing the difference after a few days.

The hardware fixes (speaker switches + jack detection) are the real non-negotiable pieces though. Without those, you're dealing with broken audio, not just mediocre audio.
