import React from 'react'
import plus from '../../logo/plus 1.png';
import Card from 'react-bootstrap/Card';


function CreateInterviewCard(props) {

    const {triggerOpen} = props;
    const clickHandler = () => {
        alert('Button is Clicked');
    }

    return (
        <Card className="create-interview-card" style={{display:'flex'}} onClick={triggerOpen}>
            <div className="card-content" style={{display:'flex'}}>
                <img className="logo" src={plus} />
                Create an Interview
            </div>
        </Card>
    )
}

export default CreateInterviewCard