import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div>
    <div>
      <Link to="/">{siteTitle}</Link>
    </div>
  </div>
)

export default Header
