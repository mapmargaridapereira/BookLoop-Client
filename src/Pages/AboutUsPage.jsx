function AboutUsPage() {
  return (
    <div className="p-4">
        <h2>About Us</h2>
        <p className="p-4 m-3">We're passionate individuals who adore reading. Recognizing the high costs associated with this hobby, we decided to utilize our developer skills and build a website for book swapping.
        Our platform connects fellow book lovers, providing an affordable way to exchange beloved titles. Together, we're creating a vibrant community where books find new homes, stories are shared, and the love for reading thrives. Join us on this journey to make reading accessible to all, one swapped book at a time.</p>
        <div className="dev-profiles container">
        <div className="row">
     
        <div className="col-sm">
        <h3>Margarida</h3>
        <img src="https://i.imgur.com/5RGPXfK.jpg" className="rounded-circle" style={{ width: 100 }}/>
        <p>Loves to read Horror, Science Fiction and theory. <br>
        </br>Favorite authors: Ottessa Moshfegh, Chuck Palahniuk, Neil Gaiman.</p>
        </div>
        <div className="col-sm">
        <h3>Cristian</h3>
        </div>
        </div>
    </div>
    </div>
  )
}

export default AboutUsPage