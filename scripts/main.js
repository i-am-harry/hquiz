var subject_code = undefined;
var no_of_questions = undefined;
var question_status = [];
var correct_answers = [];
var current_question = undefined;
var username = undefined;
var date = new Date();
var time_left_min = 14;
var time_left_sec = 60;
var timer_interval = undefined;


function check_username(){
	var a = document.getElementById('username_input');
	username = a.value;
	if(username.length == 0){
		document.getElementById('username_input_error').style.display = 'block';
		return;
	}
	animate_below_up('section0')
	intialize_section1();
}

function intialize_section1(){
	var a = document.getElementsByClassName('username');
	var l = a.length;
	for(i = 0; i<l; i++){
		a[i].innerHTML = username;
	}
}

function loadDisplay(display_code){
	var a = confirm('Do you want to start quiz');
	console.log(a);
	if(a != true) return;
	subject_code = display_code;
	intialize_section2();
	document.getElementById('display0').style.display = "block";
	document.getElementById('display1').style.display = "none";
	document.getElementById('section1').style.display = 'none';
}

function intialize_section2(){
	var questions = database[subject_code];
	no_of_questions = questions['len'];
	load_questions();
	current_time = 0;
	timer_interval = setInterval(update_remaining_time, 1000);
}


function load_questions(){
	a = document.getElementById("questions_list_panel");
	var ques_no = 0;
	var ques_body = '';
	var f = '';
	for(i = 0; i<no_of_questions; i++){
		ques_no = i;
		ques_body = database[subject_code][ques_no]['question'];
		var c = database[subject_code][ques_no]['correct'];
		var template = '<button class="question_panel_list" onclick="display_question('+ques_no+')">'+ques_body+'</button>';
		f = f + template;
		question_status.push(0);
		correct_answers.push(c);
	}
	a.innerHTML = f;
}


function display_question(ques_no){
	current_question = ques_no;
	document.getElementById('display_question').innerHTML = database[subject_code][ques_no]['question'];
	var a = document.getElementsByClassName('display_option');
	var b = database[subject_code][ques_no];
	var c = question_status[current_question];
	for(i = 0; i<a.length; i++){
		var j = i+1;
		if(j == c) a[i].style.backgroundColor = 'red';
		else a[i].style.backgroundColor = 'inherit';
		a[i].innerHTML = b['option'+j];
	}
	document.getElementById('display0').style.display = "none";
	document.getElementById('display1').style.display = "block";
}

function update_remaining_time(){
	var a = document.getElementById('remaining_time');
	time_left_sec--;
	a.innerHTML = time_left_min + ' : ' + time_left_sec;
	if(time_left_sec == 0){
		if(time_left_min == 0){
			clearInterval(timer_interval);
			submit_test();
		}
		time_left_min--;
		time_left_sec = 60;
	}
}

function select_option(option_no){
	if(question_status[current_question] != 0){
		var a = question_status[current_question];
		document.getElementsByClassName('display_option')[a-1].style.backgroundColor = 'initial';
	}
	question_status[current_question] = option_no;
	document.getElementsByClassName('display_option')[option_no-1].style.backgroundColor = 'red';
}

function submit_test(){
	var a = 0; //attempted
	var b = 0; // correct
	for(i=0; i<no_of_questions; i++){
		if(question_status[i] != 0){
			a++;
			if(question_status[i] == correct_answers[i]) b++;
		}
	}
	document.getElementById('subject_name').innerHTML = database[subject_code]['subject_name'];
	document.getElementById('no_of_questions').innerHTML = no_of_questions;
	document.getElementById('no_of_attempted').innerHTML = a
	document.getElementById('no_of_correct').innerHTML = b
	document.getElementById('score').innerHTML = b + '/' + no_of_questions;

	document.getElementById('section2').style.display = 'none';
}

// animation
function animate_below_up(selector_id){
	var a = document.getElementById(selector_id);
	a.style.height='0px';
	setTimeout(function(){
		a.style.display = 'none';
	},1000);	
}
