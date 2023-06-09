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
        <img src="https://scontent.flis3-1.fna.fbcdn.net/v/t39.30808-6/271293406_10217659049702154_6019859063841733476_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cKeIrFY3E-gAX_avWz2&_nc_oc=AQnsY_KZtmDU3a_bpKKat7qPKXUIQzPP5Mx2QiA7rkEqelFRbZiFz2xWFvtLFrmqWSo&_nc_ht=scontent.flis3-1.fna&oh=00_AfDgGh4a78civkT7eP3H8usIPOdMi83h13m21UzN4qMh4A&oe=6487B1CD" className="rounded-circle" style={{ width: 100 }}/>
        <p>Loves to read Social Studies, Philosophy, and others. <br>
        </br>Favorite authors: Susan Sontag, Kurt Vonnegut, Ernest Hemingway.</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default AboutUsPage