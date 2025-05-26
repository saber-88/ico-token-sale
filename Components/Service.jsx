import React from "react";

const Service = () => {
  const services = [
    {
      title:"Secure Storage",
      discription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nobis deserunt accusamus blanditiis non repellat quas quasi. Numquam nulla aperiam reiciendis perferendis quae quidem itaque adipisci cum voluptates beatae. Hic?"
    },
    {
      title:"Mobile App",
      discription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nobis deserunt accusamus blanditiis non repellat quas quasi. Numquam nulla aperiam reiciendis perferendis quae quidem itaque adipisci cum voluptates beatae. Hic?"
    },
    {
      title:"Exchange Service",
      discription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nobis deserunt accusamus blanditiis non repellat quas quasi. Numquam nulla aperiam reiciendis perferendis quae quidem itaque adipisci cum voluptates beatae. Hic?"
    },
    {
      title:"Investment Project",
      discription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nobis deserunt accusamus blanditiis non repellat quas quasi. Numquam nulla aperiam reiciendis perferendis quae quidem itaque adipisci cum voluptates beatae. Hic?"
    },
    {
      title:"Credit Card Use",
      discription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nobis deserunt accusamus blanditiis non repellat quas quasi. Numquam nulla aperiam reiciendis perferendis quae quidem itaque adipisci cum voluptates beatae. Hic?"
    },
    {
      title:"Planning",
      discription:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus nobis deserunt accusamus blanditiis non repellat quas quasi. Numquam nulla aperiam reiciendis perferendis quae quidem itaque adipisci cum voluptates beatae. Hic?"
    },
  ]
  return (
    <section id="service" className="small_pb">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="title_default_light title_border text-center">
              <h4 className="animation"
               data-animation="fadeInUp"
               data-animation-delay="0.2s" >
                Meet our solution for you
              </h4>
              <p className="animation"
                data-animation="fadeInUp"
                data-animation-delay="0.2s">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem facilis quam vitae alias illo inventore ullam, cum accusamus fugit facere, quas doloribus optio! Voluptate nobis deleniti cum adipisci, asperiores vitae.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {
            services.map((service, i)=>(
              <div key={i + 1} className="col-lg-4 col-md-6 col-sm-12">
                <div 
                  className="box_wrap text-center animation"
                  data-animation="fadeInUp"
                  data-animation-delay={`0.${i + 1}s`}>
                    <h4>{service.title}</h4>
                    <p>{service.discription}</p>
               </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
};

export default Service;
