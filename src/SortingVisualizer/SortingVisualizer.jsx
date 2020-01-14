import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getInsertionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import '../App.css'

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 200;
const PRIMARY_COLOR = 'turqoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };

    }

    componentDidMount() {
        this.resetArray();

    }

    resetArray() {
        const array = [];
        var numBars = document.getElementById("slider").value;
        for (let i = 0; i < numBars; i++) {
            array.push(Math.floor(Math.random() * (100) + 1));
        }
        array[Math.floor(Math.random()*numBars)] = 100;
        this.setState({array});
    }

    sort() {
        const algorithm = document.getElementById("select").value;

        if (algorithm === 'selection') {
            this.selectionSort();
        } else if (algorithm === 'bubble') {
            this.bubbleSort();
        } else if (algorithm === 'insertion') {
            this.insertionSort();
        } else if (algorithm === 'merge') {
            this.mergeSort();
        }
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i+=2) {
            const arrayBars = document.getElementsByClassName('array-bar');

            setTimeout(() => {
                const[barOneIdx, originalHeight] = animations[i];
                const[barTwoIdx, newHeight] = animations[++i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.height = `${newHeight}%`;
                barTwoStyle.height = `${originalHeight}%`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i+=2) {
            const arrayBars = document.getElementsByClassName('array-bar');

            setTimeout(() => {
                const[barOneIdx, originalHeight] = animations[i];
                const[barTwoIdx, newHeight] = animations[++i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.height = `${newHeight}%`;
                barTwoStyle.height = `${originalHeight}%`;
            }, i * ANIMATION_SPEED_MS);
        }

    }

    selectionSort() {
        const animations = getSelectionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i+=2) {
            const arrayBars = document.getElementsByClassName('array-bar');

            setTimeout(() => {
                const[barOneIdx, originalHeight] = animations[i];
                const[barTwoIdx, newHeight] = animations[++i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.height = `${newHeight}%`;
                barTwoStyle.height = `${originalHeight}%`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);

        for (let i = 2; i < animations.length; i+=3) {
          const arrayBars = document.getElementsByClassName('array-bar');
        //   const isColorChange = i % 3 !== 2;
        //   if (isColorChange) {
        //     const [barOneIdx, barTwoIdx] = animations[i];
        //     const barOneStyle = arrayBars[barOneIdx].style;
        //     const barTwoStyle = arrayBars[barTwoIdx].style;
        //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        //     setTimeout(() => {
        //       barOneStyle.backgroundColor = color;
        //       barTwoStyle.backgroundColor = color;
        //     }, i * ANIMATION_SPEED_MS);
        //   } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}%`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
    

    render() {
        const {array} = this.state;
        const width = 100/array.length;

        return (
            <div className="sort-container">
                <div id="test" className="array-container">
                    {array.map((value, idx) => (
                        <div 
                            className = "array-bar" 
                            key={idx}
                            style = {{height: `${value}%`, width: `${width}%`}}>
                        </div>
                    ))}
                </div>
                <div className = "button-container">
                    <div className = "menu">
                        <button id="generate" onClick={() => this.resetArray()}>GENERATE NEW ARRAY</button>                   
                        <select id="select">
                            <option value = "selection">SELECTION SORT</option>
                            <option value = "bubble">BUBBLE SORT</option>
                            <option value = "insertion">INSERTION SORT</option>
                            <option value = "merge">MERGE SORT</option>
                        </select>
                        <button onClick={() => this.sort()}>SORT!</button>
                        <input id="slider" type="range" min="10" max="200" onChange={() =>this.resetArray()}/>
                    </div>
                </div>
            </div>
        );
    }
}