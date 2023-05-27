import React, { Component } from 'react';
import './App.css';
import STATES from './States';

var startingState = parseInt(window.location.search.toString().substring(7,),10);
var stateNums = [0,1,2,3,4,5,6,7,8,9,10,11];
if (!stateNums.includes(startingState)){
  startingState = 0;
}

//console.log(startingState);
//console.log(typeof startingState);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...STATES[startingState],
      "regex": "",
      "macthedSomeText": false
    }
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.checkRegex = this.checkRegex.bind(this);
  }

  handleMacthedText(){
    this.setState({"matchedSomeText": true})
  }

  handleUnMatchedText(){
    this.setState({"matchedSomeText": false})
  }

  forward() {
    this.setState(function(state) {
      const index = state['index'];

      console.log(index)
      console.log(STATES.length - 1)
      if (index >= 0 && index < (STATES.length - 1)) {
        console.log('ok')
        return STATES[index + 1];
      }
      return;
    });
  }

  back() {
    this.setState(function(state) {
      const index = state['index'];

      console.log(index)
      console.log(STATES.length - 1)
      if (index > 0 && index <= STATES.length) {
        console.log('ok')
        return STATES[index - 1];
      }
      return;
    });
  }

  checkRegex(e) {
    if (e.target.value.endsWith('\\')) {
      return;
    }
    this.setState({regex: e.target.value});
  }

  render() {
    let re = RegExp('')
    try {
      re = new RegExp(this.state.regex);
    }
    catch(e) {

    }

    if (re.toString() === RegExp('(?:)').toString()){
      re = RegExp('^ ');
    }

    //console.log(re);
    const createItem = function(item) {
      const match = re.test(item.toString());
      var matchedText = "";
      if (re.toString().indexOf('(') !== -1  && re.toString().indexOf(')') !== -1 && re.toString().indexOf('(') < re.toString().indexOf(')')){
        matchedText = match ? re.exec(item.toString())[0] : "";
        //console.log('if matchted text: '+matchedText);
      } else {
        matchedText = match ? re.exec(item.toString()) : "";//
        //console.log('else matchted text: '+matchedText);
      }
      //const matchedText = match ? re.exec(item.toString()) : "";
      const matchLoc = match ? item.indexOf(matchedText.toString()) - 1 + matchedText.toString().length : 0; //
      const beforeMatchedText = match ? item.slice(0,item.indexOf(matchedText)) : item; //
      const afterMatchedText = match ? item.slice(matchLoc + 1,item.length) : ""; //

      var icon = "🚫";
      //console.log('item length: ' + item.length)
      if (re.toString().indexOf('(') !== -1  && re.toString().indexOf(')') !== -1 && re.toString().indexOf('(') < re.toString().indexOf(')')){
        if (re.exec(item.toString()) !== null){
          //console.log('match length group: ' + re.exec(item.toString())[0].length)
        }
        icon = match && item.length === re.exec(item.toString())[0].length ? "✅": "🚫";
      } else {
          if (re.exec(item.toString()) !== null){
            //console.log('match length solo: ' + re.exec(item.toString()).toString().length)
          }
        icon = match && item.length === re.exec(item.toString()).toString().length ? "✅": "🚫";
      }
      //const icon = match ? "✅": "🚫";
      //console.log('item: ' + item);
      //console.log('before: ' + beforeMatchedText);
      //console.log('match: ' + matchedText);
      //console.log('matched group: '+matchedGroup);
      //console.log('type: '+typeof matchedText);
      //console.log('after: ' + afterMatchedText);
      return (
        //<li key={item.toString()}><div className="icon">{icon}</div> {item}</li>
        //<div contenteditable><li key={item.toString()} style="color:green;"><div className="icon">{icon}</div> {item}</li></div>
        //<li key={item.toString()}><div className="icon">{icon}</div> <div contentEditable><span style={{color: 'green'}}>{matchedText}</span>{notMatchedText}</div></li>
        <li key={item.toString()} id='goodCasesItems'>
        <span className="icon">{icon}</span>
        <span className="notMatched">{beforeMatchedText}</span>
        <span className='matched'>{matchedText}</span>
        <span className='notMatched'>{afterMatchedText}</span>
        </li> //
      );
    };
    const goodItems = this.state.positives.map(item =>
      createItem(item)
    );
    const badItems = this.state.negatives.map(item =>
      createItem(item)
    );

    var goodMatchedCount = 0;
    var badMatchedCount = 0;

    for (var i = 0; i < goodItems.length; i++){
      var array_item = goodItems[i];
      var gotMatch = re.test(array_item.key);
      //console.log("got match: "+gotMatch);
      var currentMatchLength = 0;
      if (re.toString().indexOf('(') !== -1  && re.toString().indexOf(')') !== -1 && re.toString().indexOf('(') < re.toString().indexOf(')')){
        if (re.exec(array_item.key) !== null){
          currentMatchLength = gotMatch ? re.exec(array_item.key)[0].length : 0;
        }
        //console.log(re.exec(array_item.key));
        //console.log(re.exec(array_item.key)[0]);
      } else {
        currentMatchLength = gotMatch ? re.exec(array_item.key).toString().length : 0;
        //console.log(currentMatchLength);
      }
      //console.log('matched text: '+re.exec(array_item.key).toString());
      //console.log("match length: "+currentMatchLength);
      var gotMatchLength = currentMatchLength === array_item.key.length ? true : false
      if (gotMatch && gotMatchLength){
        goodMatchedCount += 1;
      }
    }

    for (var j = 0; j < badItems.length; j++){
      array_item = badItems[j];
      gotMatch = re.test(array_item.key);
      if (gotMatch){
        badMatchedCount += 1;
      }
    }

    var challenge_solved = false;
    if (goodMatchedCount === goodItems.length && badMatchedCount === 0){
      challenge_solved = true;
    }

    //console.log('good matched count: ' + goodMatchedCount);
    //console.log('bad matched count: ' + badMatchedCount);
    //console.log('challenge_solved: ' + challenge_solved);

    return (
      <div className="App">
        <h2 id="title">{this.state.title}</h2>
        <p id="explanation">{this.state.explanation}</p>
        <input id="expression" onChange={this.checkRegex} placeholder="Enter a regex here"></input>
        <br/>
        <div id="cases">
          {badItems.length > 0 && goodItems.length > 1 &&
          <div id="goodCases">
            <h4>Match these strings</h4>
            <ul>{goodItems}</ul>
          </div>
          }
          {badItems.length > 0 && goodItems.length === 1 &&
          <div id="goodCases">
            <h4>Match this string</h4>
            <ul>{goodItems}</ul>
          </div>
          }
          {badItems.length === 0 &&
          <div id="onlyGoodCases">
            <h4>Match these strings</h4>
            <ul>{goodItems}</ul>
          </div>
          }
          {badItems.length > 0 &&
          <div id="badCases">
            <h4>Don&apos;t match these strings</h4>
            <ul>{badItems}</ul>
          </div>
          }
        </div>
        <div>
        {challenge_solved && this.state.index !== 11 &&
          <h4>You&apos;ve unlocked the hidden key to the next exercise! Add <span className="hiddenKey">&quot;{this.state.hidden_key}&quot;</span> to the end of the url in the code editor and run the code to proceed.</h4>
        }
        {challenge_solved && this.state.index === 11 &&
          <h4>Congratulations, you matched all the phone numbers! You are a regex superstar!</h4>
        }
        </div>
        <br/>
      </div>
    );
  }
}

export default App;
