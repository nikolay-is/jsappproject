import React from 'react';
import Observer from '../../utilities/observer';

class Question extends React.Component {
  render() {
    return (
      <fieldset key={this.props.idx}>
        <legend>Question { this.props.idx + 1}</legend>

            <div className='form-group'>
              <label htmlFor='question' className='col-sm-3 control-label question'>Question</label>
                <div className='input-group col-sm-8'>
                  <div className='input-group-addon'>#</div>
                  <textarea
                    rows='2'
                    className='form-control'
                    id='question'
                    name='question'
                    ref='inputQuestion'
                    data-id={this.props.idx} 
                    disabled={this.props.busy}
                    onChange={Observer.onQuestionChange}
                    spellCheck={false}
                  />
                </div>
            </div><br />

            <div className='form-group'>
              <label htmlFor='a0' className='col-sm-3 control-label'>Answer 1</label>
                <div className='input-group col-sm-4'>
                  <div className='input-group-addon'>#</div>
                  <input
                    type='text'
                    className='form-control'
                    id='a0'
                    name='a0'
                    ref='inputA0'
                    data-id={this.props.idx} 
                    disabled={this.props.busy}
                    value={this.props.question['0']}
                    onChange={Observer.onQuestionChange}
                  />
                </div>
            </div><br />

            <div className='form-group'>
              <label htmlFor='a1' className='col-sm-3 control-label'>Answer 2</label>
                <div className='input-group col-sm-4'>
                  <div className='input-group-addon'>#</div>
                  <input
                    type='text'
                    className='form-control'
                    id='a1'
                    name='a1'
                    ref='inputA1'
                    data-id={this.props.idx} 
                    disabled={this.props.busy}
                    value={this.props.question['1']}
                    onChange={Observer.onQuestionChange}
                  />
                </div>
            </div><br />

            <div className='form-group'>
              <label htmlFor='a2' className='col-sm-3 control-label'>Answer 3</label>
                <div className='input-group col-sm-4'>
                  <div className='input-group-addon'>#</div>
                  <input
                    type='text'
                    className='form-control'
                    id='a2'
                    name='a2'
                    ref='inputA2'
                    data-id={this.props.idx} 
                    disabled={this.props.busy}
                    value={this.props.question['2']}
                    onChange={Observer.onQuestionChange}
                  />
                </div>
            </div><br />

            <div className='form-group'>
              <label htmlFor='a3' className='col-sm-3 control-label'>Answer 4</label>
                <div className='input-group col-sm-4'>
                  <div className='input-group-addon'>#</div>
                  <input
                    type='text'
                    className='form-control'
                    id='a3'
                    name='a3'
                    ref='inputA3'
                    data-id={this.props.idx} 
                    disabled={this.props.busy}
                    value={this.props.question['3']}
                    onChange={Observer.onQuestionChange}
                  />
                </div>
            </div><br />

            <div className='form-group'>
              <label htmlFor='correct' className='col-sm-3 control-label'>Correct Answer</label>
                <div className='input-group col-sm-2'>
                  <div className='input-group-addon'>#</div>
                  <select
                    className='form-control'
                    id='answer'
                    name='answer'
                    ref='inputAnswer'
                    data-id={this.props.idx} 
                    disabled={this.props.busy}
                    value={this.props.answer}
                    onChange={Observer.onQuestionChange}>
                    <option>Answer 1</option>
                    <option>Answer 2</option>
                    <option>Answer 3</option>
                    <option>Answer 4</option>
                  </select>
                </div>
            </div><br />

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
