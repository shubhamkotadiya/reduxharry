import grp_99 from "../../../assets/images/landing_page_new/about_us_img_new.png";
import aboutus from "../../../assets/images/landing_page_new/About-us-image.png";

const About = () => {
    return (
        <div className="landing_page_container df">
            <div className="df custom-row space-between ">
                <div className="dg landing_about_us_outer_grid">
                    <div className="flex-1 df column landing_about_us_left">
                        <div className="landing_page_content df row line-margin-small">Our vision is  to promote general knowledge, awareness and interest in social sciences among Indian students. Our aim is to help young minds excel in academics today and chart out successful careers in the future.</div>
                        <div className="landing_page_content df row line-margin-small">Pathshala is led by IIT alumni and seasoned professionals with extensive experience in education and deep-tech. We are a team that is passionate about knowledge with a keen eye for design that enhances the learning experience. The Pathshala team works with a single-minded focus to revolutionise how children consume news as well as understand and remember information heavy subjects.</div>
                        <div className="landing_page_content df row line-margin-small">Our sister product, the Summachar app is a popular knowledge resource among college students and young adults. We have also partnered with 50+ premium colleges such as IIM Ahmedabad, LD College, IIT Delhi, IIT Kanpur, etc for our knowledge newsletters.</div>
                    </div>

                    <div className=" about-img flex-1 features_img" id="features_img">
                        <embed src={aboutus} alt="" className="about-us-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;
