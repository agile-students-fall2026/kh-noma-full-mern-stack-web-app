import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that fetches and displays the About Us details from the back-end server.
 * @param {*} props an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches about-us data from the back-end server.
   */
  const fetchAboutData = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about-us`)
      .then(response => {
        // axios bundles up all response data in response.data property
        setAboutData(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch about data this once
    fetchAboutData()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>

      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}

      {aboutData && (
        <article className="AboutUs-article">
          <h2>About {aboutData.name}</h2>
          <img
            src={aboutData.imageUrl}
            alt={aboutData.name}
            className="AboutUs-image"
          />
          {aboutData.bio &&
            aboutData.bio.map((paragraph, index) => (
              <p key={index} className="AboutUs-bio">
                {paragraph}
              </p>
            ))}
        </article>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs