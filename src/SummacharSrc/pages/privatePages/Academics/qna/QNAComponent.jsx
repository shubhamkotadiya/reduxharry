import ReactMarkDownCustom from "../../../../components/ReactMarkDownCustom";

const QNAComponent = (props) => {
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
                children={data.question ? data.question : ""}                
            />
            <div className="html-embed-container typo-sub-headings  row column">

                <ReactMarkDownCustom
                    children={data.answer ? data.answer : ''}                
                />
            </div>
        </div>
    )
}
export default QNAComponent;