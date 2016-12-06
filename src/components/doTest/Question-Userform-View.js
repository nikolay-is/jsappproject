import React from 'react';
import Observer from '../../utilities/observer';

class Question extends React.Component {
  render() {
    return (
      <fieldset key={this.props.idx}>
        <legend>Question {this.props.idx + 1}</legend>

        <div className='question col-sm-9'>
          <pre>{this.props.question.question.trim()}</pre>
        </div><br />

        <div className='test-answers'>
          { this.props.question['a0'] && this.props.question['a0'] !== 'XXX' &&
            <label className='col-sm-8' style={{float:'none'}}>
              1: <input
                type='radio'
                className=''
                id='a0'
                name={this.props.idx}
                data-id={this.props.idx} 
                disabled={this.props.busy}
                value={this.props.question['a0']}
                onChange={Observer.onQuestionAnswerChange}
                checked={'' + this.props.checked === '0' ? true : false}
              /> {this.props.question['a0']}
            </label>
          }
          { this.props.question['a1'] && this.props.question['a1'] !== 'XXX' &&
            <label className='col-sm-8' style={{float:'none'}}>
              2: <input
                type='radio'
                className=''
                id='a1'
                name={this.props.idx}
                data-id={this.props.idx} 
                disabled={this.props.busy}
                value={this.props.question['a1']}
                onChange={Observer.onQuestionAnswerChange}
                checked={'' + this.props.checked === '1' ? true : false}
              /> {this.props.question['a1']}
            </label>
          }
          { this.props.question['a2'] && this.props.question['a2'] !== 'XXX' &&
            <label className='col-sm-8' style={{float:'none'}}>
              3: <input
                type='radio'
                className=''
                id='a2'
                name={this.props.idx}
                data-id={this.props.idx} 
                disabled={this.props.busy}
                value={this.props.question['a2']}
                onChange={Observer.onQuestionAnswerChange}
                checked={'' + this.props.checked === '2' ? true : false}
              /> {this.props.question['a2']}
            </label>
          }
          { this.props.question['a3'] && this.props.question['a3'] !== 'XXX' &&
            <label className='col-sm-8' style={{float:'none'}}>
              4: <input
                type='radio'
                className=''
                id='a3'
                name={this.props.idx}
                data-id={this.props.idx} 
                disabled={this.props.busy}
                value={this.props.question['a3']}
                onChange={Observer.onQuestionAnswerChange}
                checked={'' + this.props.checked === '3' ? true : false}
              /> {this.props.question['a3']}
            </label>
          }
          { this.props.question['a4'] && this.props.question['a4'] !== 'XXX' &&
            <label className='col-sm-8' style={{float:'none'}}>
              5: <input
                type='radio'
                className=''
                id='a4'
                name={this.props.idx}
                data-id={this.props.idx} 
                disabled={this.props.busy}
                value={this.props.question['a4']}
                onChange={Observer.onQuestionAnswerChange}
                checked={'' + this.props.checked === '4' ? true : false}
              /> {this.props.question['a4']}
            </label>
          }
          { this.props.question['a5'] && this.props.question['a5'] !== 'XXX' &&
            <label className='col-sm-8' style={{float:'none'}}>
              6: <input
                type='radio'
                className=''
                id='a5'
                name={this.props.idx}
                data-id={this.props.idx} 
                disabled={this.props.busy}
                value={this.props.question['a5']}
                onChange={Observer.onQuestionAnswerChange}
                checked={'' + this.props.checked === '5' ? true : false}
              /> {this.props.question['a5']}
            </label>
          }
        </div>
      </fieldset>
    );
  }
}

Question.propTypes = {
  busy: React.PropTypes.bool.isRequired,
  question: React.PropTypes.object.isRequired,
  idx: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func
}

Question.defaultProps = {
  busy: false
}

export default Question;
