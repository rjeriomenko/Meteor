import './Publish.css';
import SiteNavBar from '../SiteNavBar/index';

const Publish = props => {

    return (
        <>
            <SiteNavBar page='publish' />

            <div className="publish">
                <div contentEditable={true} className='publish-content'>
                    <div>Start Typing Here</div>
                </div>
            </div>
        </>
    );
}

export default Publish;
