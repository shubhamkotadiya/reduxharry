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
                            <span className="row  faq-heading" >Frequently Asked Questions</span>
                        </div>
                        <div className="landing_page_container" >
                            <FAQ
                                question="Who is Pathshala for? "
                                answer={{
                                    otherContent: [
                                        "<span>Pathshala is child friendly and is relevant for children of Ages 10 and above</span>"
                                    ]
                                }}

                            />
                            <FAQ
                                question="How do I enroll in Summachar Pathshala?"
                                answer={{
                                    otherContent: [
                                        "<span>You can easily enroll by clicking <a href='/signin'> here.</a>  The Pathshala journey awaits inquisitive minds like you.</span><br/><br/> For further queries, feel free to reach out to us at:<br/>Email: <a href='mailto:namaskar@summachar.in'> namaskar@summachar.in</a>,<br/> No: 9880678169"
                                    ]
                                }}

                            />
                            <FAQ
                                question="What do I get with Pathshala’s ‘News for Kids’ package?"
                                answer={{
                                    otherContent: [
                                        '<span><b>‘News for Kids’</b> is an all-in-one package for kids to make learning fun. With Pathshala, young minds get: <br /> <br /></span>',
                                        '- Informative and unbiased news covered in simple infographics. ',
                                        '- Stories curated for the growth of curious young minds on future oriented topics like financial literacy, important national and global events, renewable energy, tech industry and much more.',
                                        '- Daily quizzes, word search, sudoku and other games.',
                                        '- Stuff of the Day updated with thoughts, facts, jokes and questions daily.',
                                        '- Kids’ Corner: Showcasing talents of young artists, authors, artists across India. ',
                                        '- Campus Buzz: A place to relive fun memories of your school and see what other children across the country are up to in their schools.'

                                    ],


                                }}

                            />

                            <FAQ
                                question="What are infocards or infographics?"
                                answer={{
                                    otherContent: [
                                        'Infographics are what the name suggests: Info+graphics. It is a method where lots and lots of information is represented in the form of graphics. As we say that a picture is equal to a thousand words, Pathshala’s infographics cover complex topics and simplifies them with the help of visual representation, making it both easy to understand and fun. Check out some<a href="/home" style="text-decoration:underline"> FREE Sample Content</a>  and see for yourself.'

                                    ],


                                }}

                            />


                            <FAQ
                                question="How does Pathshala help in the development of Kids?"
                                answer={{
                                    otherContent: [
                                        'Humans are social animals. To live in a society, young minds need to know what’s happening. We need to learn about opportunities and be more informed about solutions to day-to-day problems. All these things help young minds become better people and develop a smarter personality.'

                                    ],


                                }}

                            />


                            <FAQ
                                question="What News topics are covered by Pathshala?"
                                answer={{
                                    otherContent: [
                                        'Pathshala covers simplified and unbiased news on future oriented topics like:<br /><br />',
                                        '- Science & Tech ',
                                        '- Financial Literacy',
                                        '- Important National and Global Events',
                                        '- Renewable Energy ',
                                        '- Tech Industry ',
                                        '- Inspiring Stories about Personalities and much more'



                                    ],


                                }}

                            />



                            <FAQ
                                question="Is Pathshala only a news App?"
                                answer={{
                                    otherContent: [
                                        ' Pathshala is much more than a news app. With Pathshala you can play brain development games, go through stuff of the day which is updated daily with facts, jokes and questions. There is <b>Kids’ Corner</b> which showcases talents of young artists, authors and artists across India. There is Campus Buzz, a place to relive fun memories of your school and see what other children across the country are up to in their schools.'




                                    ],


                                }}

                            />

                            <FAQ
                                question="Can I get sample news content on Pathshala?  "
                                answer={{
                                    otherContent: [
                                        ' Yes, <a href="/sign-in" style="text-decoration:underline" >sign up for FREE</a> today and get access to sample news content.'
                                    ],
                                }}

                            />


                            <FAQ
                                question="Can I get sample quiz content on Pathshala?"
                                answer={{
                                    otherContent: [
                                        ' Yes, <a href="/sign-in" style="text-decoration:underline" >sign up for FREE</a> today and get access to sample quiz  content.'
                                    ],
                                }}

                            />

                            <FAQ
                                question="Do I get a refund if I decide to cancel the plan?"
                                answer={{

                                    otherContent: [
                                        '<span>You can check out the refund policy<a href="/refund-policy">  here.</a><span>'
                                    ]
                                }}

                            />
                        </div>
                        {/* <div className="landing_page_container" >
                            <FAQ
                                question="How do I enroll in Summachar Pathshala?"
                                answer={{
                                    otherContent: [
                                        "<span>It is easy! Simply click <a href='/signin'> here.</a>  The Pathshala journey awaits inquisitive minds like you.</span><br/><br/> For further queries, feel free to reach out to us at:<br/>Email: <a href='mailto:namaskar@summachar.in'> namaskar@summachar.in</a>,<br/> No: 9880678169"
                                    ]
                                }}

                            />
                            <FAQ
                                question="What do I get from the Pathshala package?"
                                answer={{
                                    otherContent: [
                                        "The Pathshala package has all the material you need to easily learn Class 11th and 12th Arts stream subjects and concepts. Pathshala’s content is designed to help students excel in exams. <br/><br/> The full syllabus of 11th and 12th Arts Stream is covered in depth. <br/><br/> All concepts are explained in easy-to-read infographics. This is ideal for students to quickly understand and remember their study material. <br/><br/> Infographic flashcards are ideal for last minute revision before exams. <br/><br/> Fun videos make sure students understand all concepts in-depth.<br/><br/> Every subject contains huge question banks that help students boost their preparation. <br/><br/> With our live doubt solving feature, students can get personalised answers to their queries in 24 hours."
                                    ]
                                }}
                            />
                            <FAQ
                                question="Do infographics/flash cards and videos cover entire chapters?"
                                answer={{
                                    otherContent: [
                                        "Yes, the material covers all the chapters of 11 and 12 Arts stream for Economics, Psychology, Political Science, History, Sociology and Geography. "
                                    ]
                                }}

                            />
                            <FAQ
                                question=" Is Pathshala material enough for 12th board exam preparations?"
                                answer={{
                                    otherContent: [
                                        "Yes, definitely! We have made sure that the material covers 12th Arts subjects, explains all important concepts visually and is easy to navigate. Not only that, Pathshala offers board questions from previous years along with practice tests. It even provides key points and sample answers for all the important board questions!"
                                    ]
                                }}

                            />
                            <FAQ
                                question="Do I get access to all the 11th and 12th Arts material at once?"
                                answer={{
                                    otherContent: [
                                        'Yes, all the material is accessible to you once you purchase the plan.'
                                    ]
                                }}

                            />
                            <FAQ
                                question=" Do I get a doubt solving feature with Pathshala?"
                                answer={{
                                   otherContent: [
                                        "Yes. Pathshala's doubt solving feature comes along with the plan. Expert doubt solvers at Pathshala make sure they clear the doubts within 24 hours."
                                    ]
                                }}

                            />

                            <FAQ
                                question="What education boards are covered by Pathshala?"
                                answer={{
                                    otherContent: [
                                        "Pathshala’s infographics, videos, and quizzes cover 11th and 12th Arts syllabus for NCERT, CBSE, and State Boards."
                                    ]
                                }}

                            />
                            <FAQ
                                question="Can I get free sample content on Pathshala?"
                                answer={{
                                    otherContent: [
                                        '<span>Yes, <a href="/signin"> sign up for a FREE DEMO</a> today and get access to 10+ topics of every subject.</span>'
                                    ]
                                }}

                            />
                            <FAQ
                                question=" Are there any additional benefits of Pathshala?"
                                answer={{

                                    otherContent: [
                                        "Yes, you get FREE access to unbiased and simplified News that is ideal for students. Pathshala covers simplified and unbiased news around the following topics: <br /><br />World and Current Affairs, Financial Literacy, Business, Sci-tech and India.<br /><br />Exposure to important news on a regular basis will prepare students for entrance exams such as UPSC, CAT, CLAT and NDA right from their school days."
                                    ]
                                }}

                            />
                            <FAQ
                                question="Can I refer to Pathshala for UPSC exams?"
                                answer={{

                                    otherContent: [
                                        "Yes. In fact, Pathshala has relevant material to help you crack entrance exams like UPSC, CAT and CLAT. <br/><br/>This will also be useful for IAS aspirants and students aiming to crack exams for banking, postal services, state level administrative services as well as NDA."
                                    ]
                                }}

                            />
                            <FAQ
                                question="Do I get a refund if I decide to cancel the plan?"
                                answer={{

                                    otherContent: [
                                        '<span>You can check out the refund policy<a href="/refund-policy">  here.</a><span>'
                                    ]
                                }}

                            />

                            
                           

                        </div> */}

                    </div>
                    <Footer />
                </div>
            </Header>
        </>
    )
}
export default LandingPageFAQ;