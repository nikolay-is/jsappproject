import React from 'react';

class PreviewQuestion extends React.Component {
  render() {
    if (!this.props.isLoggedIn) this.context.router.push('/');

    const correctIdx = Number(this.props.correctAnswer && this.props.correctAnswer.slice(-1) - 1);
    const givenIdx = Number(this.props.givenAnswer && this.props.givenAnswer.slice(-1) - 1);

    return (
      <fieldset className='user-test-result-question'>
        <legend>Question { Number(this.props.id) + 1}</legend>

        <p className='user-test-result-question'>{this.props.question}</p>
        <div className='user-test-result-answers col-sm-10'>
          {
            this.props.answers.filter(a => a)
              .map((a, idx) => <p
                key={idx}
                className={'user-test-result-answer col-sm-5 ' + 
                  (idx===correctIdx ? 'correct' : idx===givenIdx ? 'wrong' : 'blank')}
              >
                  {(Number(idx) + 1) + ': ' + a}
              </p>)
          }<br />
        </div><br />
        <div className='user-test-result-correct col-sm-10'>
          The correct answer is {this.props.correctAnswer}
        </div>
        <div className='user-test-result-given col-sm-10'>
          {this.props.givenAnswer ? 'Your answer is: ' + this.props.givenAnswer : null}
        </div>
      </fieldset>
    );
  }
}

PreviewQuestion.contextTypes = {
  router: React.PropTypes.object
};

PreviewQuestion.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  question: React.PropTypes.string.isRequired,
  answers: React.PropTypes.array.isRequired,
  correctAnswer: React.PropTypes.string.isRequired,
  givenAnswer: React.PropTypes.string
}

PreviewQuestion.defaultProps = {}

export default PreviewQuestion;
