function Slide() {
    return ( 
        <div className="container" style={styles.slide}>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://bizweb.dktcdn.net/100/275/458/themes/613299/assets/slide_index_2.jpg?1521086904425" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://bizweb.dktcdn.net/100/275/458/themes/613299/assets/slide_index_2.jpg?1521086904425" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://bizweb.dktcdn.net/100/275/458/themes/613299/assets/slide_index_2.jpg?1521086904425" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
     );
}

export default Slide;
const styles={
    slide:{
      position: 'relative',
      height:"auto",
      borderRadius:"10px",
     
    },
}