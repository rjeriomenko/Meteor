import './Publish.css';
import SiteNavBar from '../SiteNavBar/index';

const Publish = props => {

    return (
        <>
            <SiteNavBar />

            <div className="Publish">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>HI FROM PUBLISH</p>
                <>
                    <div contentEditable={true}>TEST
                        <strong>WITHIN P</strong>
                    </div>
                    <textarea />
                </>
            </div>
        </>
    );
}

export default Publish;
