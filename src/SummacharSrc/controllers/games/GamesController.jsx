import SudokuController from "./SudokuController"
const GamesController = () => {
    return (<>
         <p className="row typo-sub-headings m-v-primary p-h-secondary" style={{color:"#000"}}>Improve your brain power with interesting games updated everyday!</p>

        <div className="news_container" id="news_container" style={{ paddingBottom: "20px" }}>
            <div className="outer-main-container" >
                <div className="common-grid-outer">
                    <div className="inner-container centered_outer_container">
                        <div className="container" >
                            <div className="news_div p-h-secondary" >
                                <SudokuController />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default GamesController