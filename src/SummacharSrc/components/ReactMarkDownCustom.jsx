import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'


const CustomParagraph = ({ children }) => { return <p className="typo-Description">{children}</p> }
const CustomLi = ({ children }) => { return <li className="typo-Description">{children}</li> }
const CustomHeadings = ({ children }) => <h2 className="typo-headings p-v-primary">{children}</h2>
const CustomLink = ({ children, node }) => <a href={node.properties.href} style={{ color: "#5c56d4" }} className="typo-Description">{children}</a>
const Customimg = ({ children, node }) => { return <div className="custom-img df row center"><img src={node.properties.src} alt="" /></div> }

const ReactMarkDownCustom = (props) => {
    return (<ReactMarkdown

        components={{
            p: (node) => CustomParagraph(node),
            li: (node) => CustomLi(node),
            img: (node) => Customimg(node),
            h2: (node) => CustomHeadings(node),
            a: (node) => CustomLink(node)
        }}
        skipHtml={true}
        children={props.children}
        unwrapDisallowed={true}
        remarkPlugins={[remarkGfm]}
    />)
}

export default ReactMarkDownCustom