import './App.css';
import { Container, Row, Col } from 'reactstrap';
import CalculatorKey from './CalculatorKey';
import { useEffect, useState } from 'react';

const App = () => {

  const [preValue, SetPreValue] = useState(0);
  const [postValue, SetPostValue] = useState(0);
  const [operation, SetOperation] = useState(null);
  const [ansStatus, SetAnsStatus] = useState(false);
  const [operStatus, SetOperStatus] = useState(false);
  const clearAllData = () => {
    SetPreValue(0);
    SetPostValue(0);
    SetOperation(null);
  }
  const Handlecalculate = (val) => {
    console.log(val);
    if (Number.isInteger(parseInt(val))) {
      if (ansStatus == false && !/\./.test(postValue))
        SetPostValue(postValue * 10 + parseInt(val));
      else if (ansStatus == false && /\./.test(postValue))
        SetPostValue(postValue + val.toString());
      else {
        SetPostValue(val);
        SetAnsStatus(false);
      }
    }
    else if (val == 'AC') {
      clearAllData();
    }
    else if (val == 'C') {
      SetPostValue(0);
    }
    else if (val == '\xb1') {
      SetPostValue(-1 * postValue);
    }
    else if (val == '%') {
      SetPostValue(0.01 * postValue);
    }
    else if (val == '+' || val == '-' || val == '×' || val == '÷') {
      SetAnsStatus(false);
      if (val == '×') {
        val = '*';
      }
      if (val == '÷') {
        val = '/';
      }
      SetOperation(val);
      if (preValue != 0 && postValue!=0) {
        SetPreValue(eval('(' + preValue.toString() + ')' + operation.toString() + '(' + postValue.toString() + ')'));
        SetPostValue(0);
      }
      else if (preValue == 0) {
        SetPreValue(postValue);
        SetPostValue(0);
      }
    }
    else if (val == '=') {
      SetAnsStatus(true);
      if (operation == null) {
        SetPostValue(preValue);

      }
      else {
        SetPostValue(eval('(' + preValue.toString() + ')' + operation.toString() + '(' + postValue.toString() + ')'));
        console.log(preValue.toString() + operation.toString() + postValue.toString());
      }
      SetPreValue(0);
      SetOperation(null);
    }
    else if (val == '.') {
      if (!/\./.test(postValue)) {
        SetAnsStatus(false);
        SetPostValue(postValue + ".");
      }
    }
  }



  return (
    <Container className='Calculator'>
      {/*<Row className='test'><Col>{postValue}</Col><Col>{operation}</Col><Col>{preValue}</Col></Row>*/}
      <div id='result' className='Input text-right justify-content-end'>{postValue}</div>
      <Row >
        <CalculatorKey className='cbt btspecail col' keyValue='AC' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btspecail col' keyValue='C' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue={'\xb1'} onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue='%' onClick={Handlecalculate} />
      </Row>
      <Row >
        <CalculatorKey className='cbt btnumber col' keyValue='7' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='8' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='9' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue='+' onClick={Handlecalculate} />
      </Row>
      <Row >
        <CalculatorKey className='cbt btnumber col' keyValue='4' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='5' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='6' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue='-' onClick={Handlecalculate} />
      </Row>
      <Row >
        <CalculatorKey className='cbt btnumber col' keyValue='1' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='2' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='3' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue='×' onClick={Handlecalculate} />
      </Row>
      <Row >
        <CalculatorKey className='cbt btnumber col' keyValue='0' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btnumber col' keyValue='.' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue='=' onClick={Handlecalculate} />
        <CalculatorKey className='cbt btoperation col' keyValue='÷' onClick={Handlecalculate} />
      </Row>
    </Container>
  );
}

export default App;
