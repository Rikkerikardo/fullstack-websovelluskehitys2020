import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className="my-3" variant="info" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button className="my-3" variant="dark" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})
export default Togglable
