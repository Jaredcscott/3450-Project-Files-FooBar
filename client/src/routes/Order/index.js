import React from 'react'
import styled from 'styled-components'
// import { useSelector, useDispatch } from 'react-redux'
// import { getTheme } from '../../redux-store/theme'
// import reactRouterDom from 'react-router-dom'



export default function Order() {
	function getBagels() {
		return  {plain: 2, onion: 2, cinnamon_raisen: 2, sesame: 2, cheesy: 2, pumpernicel: 2}
	}
	function getSmears() {
		return {plain : 1, honey_nut: 1, strawberry: 1, frech_onion: 1}
	}
	function getSammicheStuff () {
		return {bacon: 1, egg: 2, cheese: 1, sausage: 2, avacado: 10, turkey: 2, ham: 2, spinach: 1, tomato: 1, lox: 10}
	}
	function getBeverages (){
		return {coffee: 2, milk: 2, oj: 2, water: 5}
	}

	const bagels = getBagels();
	const smears = getSmears();
	const sammicheStuff = getSammicheStuff(); 
	const beverages = getBeverages();
	function addSmear() {
		let smearMenu = document.createElement("select");
		for (var x in smears){
			smearMenu.innerHTML = smearMenu.innerHTML + "<option value=\"" + x + "\">" + x + "($" + smears[x] + ") </option>"
		}
		this.parentNode.insertBefore(smearMenu, this)
		this.onclick = removeSmear;
		this.textContent = "remove smear from this bagel"

	}
	function removeSmear() {
		this.parentNode.removeChild(this.previousSibling)
		this.onclick = addSmear;
		this.textContent = "add a smear to this bagel"
	}
	function addStuff() {
		this.textContent = "cancel the sammiche"
		let stuffMenu = document.createElement("form")
		for (var x in sammicheStuff){
			stuffMenu.innerHTML = stuffMenu.innerHTML + "<input type=\"checkbox\" id=\"" + x + "\" name=\"" +x + "\" value=\"" + x + "\"><label for=\"" + x + "\">" + x +"($" + sammicheStuff[x] + ")" +"</label>"
		}
		this.parentNode.appendChild(stuffMenu);
		this.onclick = removeStuff;
	}
	function removeStuff() {
		this.parentNode.removeChild(this.nextSibling.nextSibling);
		this.textContent = "make this a sammiche";
		this.onclick = addStuff;
	}
	

	function addBagle(){
		let list = document.getElementById("bagleOrder");
		let bagelMenu = document.createElement("select");
		for (var x in bagels){
			bagelMenu.innerHTML = bagelMenu.innerHTML + "<option value=\"" + x + "\">" + x + "($" + bagels[x] + ") </option>"
		}
		let temp = document.createElement("li");
		temp.setAttribute("style", "display: inline-block;")
		temp.appendChild(bagelMenu);
		let smearButton = document.createElement("button");
		smearButton.textContent = "add a smear to this bagel"
		smearButton.onclick = addSmear;
		temp.appendChild(smearButton);
		let sammicheButton = document.createElement("button");
		sammicheButton.textContent = "make this a sammiche";
		sammicheButton.onclick = addStuff;
		temp.appendChild(sammicheButton)
		let remove = document.createElement("button")
		remove.textContent = "remove this bagel";
		remove.onclick = () => {
			remove.parentNode.parentNode.removeChild(remove.parentNode.nextSibling);
			remove.parentNode.parentNode.removeChild(remove.parentNode);
		}
		temp.appendChild(remove);
		list.appendChild(temp);
		list.appendChild(document.createElement("br"));
	};
	function addBeverage() {
		let list = document.getElementById("beverageOrder");
		let beverageMenu = document.createElement("select");
		for (var x in beverages){
			beverageMenu.innerHTML = beverageMenu.innerHTML + "<option value=\"" + x + "\">" + x + "($" + beverages[x] + ") </option>"
		}
		let temp = document.createElement("li");
		temp.setAttribute("style", "display: inline-block;")
		temp.appendChild(beverageMenu);
		let remove = document.createElement("button")
		remove.textContent = "remove this beverage";
		remove.onclick = () => {
			remove.parentNode.parentNode.removeChild(remove.parentNode.nextSibling);
			remove.parentNode.parentNode.removeChild(remove.parentNode)
		}
		temp.appendChild(remove)
		list.appendChild(temp);
		list.appendChild(document.createElement("br"));
	};

	return (
		<Screen>
			
			<button style= {{width: "50%"}} onClick= {addBagle}> add bagel to order</button> 
			<button style= {{width: "50%"}} onClick= {addBeverage}>add beverage to order</button>
			
			<ul id="bagleOrder" style={{textAlign: "center"}}></ul>
			<ul id="beverageOrder"style={{textAlign: "center"}}></ul>
			<p>
				I would like my order to be ready at  
				<input type="time" id="time"></input>
				 on
				<input type="date" id="date"></input>
			</p>
			
			<button style= {{width: "100%"}}>place order</button>
		</Screen>
	)
}

const Screen = styled.div`
	width: 100%;
	margin: auto;
	margin-top: 0;
	justify-content: center;
	align-items: center;
	background-color: #cccccc;
`
