import FAQ from "../common/FAQ";
import Header from "../common/Header";
import Footer from "../component/Footer";

const LandingPageFAQ = () => {
    return (
        <>
            <Header >
                <div className="fit-content scrollable">
                    <div className="component-container" style={{ marginBottom: "0px" }}>
                        <div className="row center title-margin df column" style={{ marginTop: "10px" }}>
                            <h1 className="row  component-title" >Frequantly Asked Questions</h1>
                        </div>
                        <div className="landing_page_container">
                            <h2 className="txt-gray txt-dark">Academics</h2>
                            <FAQ
                                question="How do I enroll in Summachar Pathshala?"
                                answer={{
                                    list: [
                                        "The Pathshala journey awaits inquisitive minds like you. You can easily enroll by clicking <a href='/signin'> here.</a> "
                                    ],
                                    otherContent: [
                                        "For further queries, feel free to reach out to us at:",
                                        "Email: <a href='mailto:namaskar@summachar.in'> namaskar@summachar.in</a>",
                                        "No: 9880678169"
                                    ]
                                }}

                            />
                            <FAQ
                                question="What do I get from the Pathshala package?"
                                answer={{
                                    list: [
                                        'he PathshalTa package has all the material you need to easily learn Class 11th and 12th Arts stream subjects and concepts. Pathshala’s content is designed to help students excel in exams.',
                                        'The Full syllabus of 11th and 12th Arts Stream is covered in depth. ',
                                        'All concepts are explained in easy to read infographics. This is ideal for students to quickly understand and remember their study material.',
                                        'Infographic Flashcards are ideal for last minute revision before exams.',
                                        'Fun videos make sure students understand all concepts in depth.',
                                        'Every subject contains huge question banks that help students boost their preparation.',
                                        'With our Live Doubt Solving feature, students can get personalised answers to their queries in 24 hours.'
                                    ],
                                    otherContent: [

                                    ]
                                }}
                            />
                            <FAQ
                                question="Do infographics/flash cards and videos cover entire chapters?"
                                answer={{
                                    list: ['Yes,the material covers all the chapters of 11 and 12 Arts stream for Economics, Psychology, Political Science, History, Sociology and Geography.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question=" Is Pathshala material enough for 12th board exam preparations?"
                                answer={{
                                    list: ['Yes it is. We have made sure that the material covers the entire 12th arts course, explains all important concepts visually and is easy to navigate. Not only that, Pathshala offers board questions from previous years along with practice tests. It even provides key points and sample answers for all the important board questions!'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="Do I get access to all the 11th and 12th Arts material at once?"
                                answer={{
                                    list: ['Yes, all the material is accessible to you once you purchase the plan.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question=" Do I get a doubt solving feature with Pathshala?"
                                answer={{
                                    list: ['Yes, Pathshala\'s doubt solving feature comes along with the plan. Expert doubt solvers at Pathshala make sure they clear the doubts within 24 hours.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question=" Does Pathshala offer previous years’ board papers?"
                                answer={{
                                    list: ['Yes. Pathshala offers 12th Arts board exam question papers from 20- to 2020 (We keep adding articles and Question Papers around this and keep updating the year)'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="What education boards are covered by Pathshala?"
                                answer={{
                                    list: ['Pathshala’s infographics, videos, and quizzes cover 11th and 12th Arts syllabus for NCERT, CBSE, and State Boards.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="Can I get free sample content on Pathshala?"
                                answer={{
                                    list: ['Yes, <a href="/signin"> sign up for a FREE DEMO</a> today and get access to 10+ topics of every subject.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question=" Are there any additional benefits of Pathshala?"
                                answer={{
                                    list: [
                                        'Yes, you get access to unbiased and simplified News that is ideal for students for FREE'
                                        ,'Pathshala covers simplified and unbiased news around the following topics: World and Current Affairs, Financial Literacy, Business, Sci-tech and India.',
                                        'Exposure to important news on a regular basis will prepare students for entrance exams such as UPSC, CAT, CLAT and NDA right from their school days.'
                                    ],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="Can I refer to Pathshala for UPSC exams?"
                                answer={{
                                    list: [
                                        'Yes. In fact, Pathshala has relevant material to help you crack entrance exams like UPSC, CAT and CLAT. ',
                                        'This will also be useful for IAS aspirants and students aiming to crack exams for banking, postal services, state level administrative services as well as NDA.'
                                    
                                    ],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="Do I get a refund if I decide to cancel the plan?"
                                answer={{
                                    list: ['You can check out the <a href="/refund-policy"> refund policy here.</a>'],
                                    otherContent: [

                                    ]
                                }}

                            />

                            <FAQ
                                question="What are the future opportunities in the Arts field?"
                                answer={{
                                    list: ['To have a look on the careers in Arts Stream, check out our blog on careers in Arts'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            
                            
                            
                            
                            
                            
                            <h2 className="txt-gray txt-dark">News</h2>
                            
                            
                            
                            
                            
                            <FAQ
                                question="Is Pathshala only relevant for class 11th and 12th?"
                                answer={{
                                    list: ['We provide daily child-friendly news for all students. Click here to read more about Pathshala News Package.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="What genre of News does Pathshala Cover?
"
                                answer={{
                                    list: ['Pathshala covers simplified and unbiased news around the following topics: World and Current Affairs, Financial Literacy, Business, Sci-tech and India.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                            <FAQ
                                question="Can I check out some sample News Content before buying the News Package?"
                                answer={{
                                    list: ['Yes. You can check out our awesome stories<a href="/news"> here</a> for FREE(Link to the news page embedded)'],
                                    otherContent: [

                                    ]
                                }}

                            />

                            <FAQ
                                question=" What age group is the News content relevant for?"
                                answer={{
                                    list: ['The News content is child friendly and is relevant for children of ages 10 and above.'],
                                    otherContent: [

                                    ]
                                }}

                            />
                             <FAQ
                                question="How to enroll into the News Package of Summachar Pathshala?"
                                answer={{
                                    list: ['The Pathshala journey awaits awesome minds like you. Click here to enroll yourselves into Pathshala. For further queries, feel free to contact us, here are our contact details:'],
                                    otherContent: [
                                        "For further queries, feel free to reach out to us at:",
                                        "Email: <a href='mailto:namaskar@summachar.in'> namaskar@summachar.in</a>",
                                        "No: 9880678169"
                                    ]
                                }}

                            />






                            <h2 className="txt-gray txt-dark">About Us</h2>





                             <FAQ
                                question=" Who is behind Pathshala?
"
                                answer={{
                                    list: ['Pathshala team is led by IIT alumni and seasoned professionals with extensive experience in education and deep-tech. We are a young, creative and passionate team looking to revolutionise how students study and understand information-heavy subjects. The Content writers at Pathshala, being Arts teachers themselves, have a solid vision of how academic content needs to be presented to the students. We have meticulously curated, verified and tailored each and every flash card, video and quiz to make sure that the students get a holistic idea of the subjects that they study. Our aim is to help our students do well not only in exams, but also in their lives.'],
                                    otherContent: [

                                    ]
                                }}

                            />

                        </div>
                    </div>
                    <Footer />
                </div>
            </Header>
        </>
    )
}
export default LandingPageFAQ;