import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'
import ReactMarkDownCustom from '../../../../components/ReactMarkDownCustom'
const CustomParagraph = ({ children }) => { return <p className="typo-Description">{children}</p> }
const CustomLi = ({ children }) => { return <li className="typo-Description">{children}</li> }
const CustomHeadings = ({ children }) => <h2 className="typo-headings p-v-primary">{children}</h2>
const CustomLink = ({ children, node }) => <a href={node.properties.href} style={{ color: "#5c56d4" }} className="typo-Description">{children}</a>
const Customimg = ({ children, node }) => { return <div className="custom-img df row center"><img src={node.properties.src} alt="" /></div> }
const RevisionComponent = (props) => {
    const data = props.data;
    let color = "#000";
    switch (data.category) {
        case "Brief Answer": color = "#E7316F";
        case "Short Note": color = "#05948F";
        case "Long Answer": color = "#017DCB";
        case "Definition": color = "#E7316F";
        case "Formulae": color = "#017DCB";
    }
    return (
        <div className="df row border-primary p-primary column m-v-primary radius-primary p-relative" style={{ marginTop: '0px' }}>
            {data.category && <span className="typo-sub-headings font-bold" style={{ color: color }}>{data.category}</span>}
            <ReactMarkDownCustom
                children={data.title ? data.title : ""}
            />
            <div className="html-embed-container typo-sub-headings  row column">
                <ReactMarkDownCustom
                    children={data.detail ? data.detail : ""}
                />
            </div>
        </div>
    )
}
export default RevisionComponent;