<img src="https://github.com/JohnApCo/pomodoro-timer/blob/main/public/img/Pomodoro-Timer.png?raw=true"></img>

<h1 align="center">Pomodoro Timer</h1>

<div align="center">
  <h3>
    <a href="https://codepen.io/JohnApCo/live/bGxQWYZ" color="white">
      Live
    </a>
   <span> | </span>
    <a href="https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock">
      Challenge
    </a>
  </h3>
</div>
<div align="center">
   Solution for a challenge from  <a href="https://www.freecodecamp.org/" target="_blank">freecodecamp.org</a>.
</div>
<br>
<br>
<br>

## About The Project

<p>The Pomodoro Technique is a time management method based on 25-minute stretches of focused work broken by five-minute breaks. Longer breaks, typically 15 to 30 minutes, are taken after four consecutive work intervals. Each work interval is called a pomodoro, the Italian word for tomato</p>

### Users should be able to:

<p><strong>User Story #1:</strong> I can see an element with <code>id="break-label"</code> that contains a string (e.g. "Break Length").</p>
<p><strong>User Story #2:</strong> I can see an element with <code>id="session-label"</code> that contains a string (e.g. "Session Length").</p>
<p><strong>User Story #3:</strong> I can see two clickable elements with corresponding IDs: <code>id="break-decrement"</code> and <code>id="session-decrement"</code>.</p>
<p><strong>User Story #4:</strong> I can see two clickable elements with corresponding IDs: <code>id="break-increment"</code> and <code>id="session-increment"</code>.</p>
<p><strong>User Story #5:</strong> I can see an element with a corresponding <code>id="break-length"</code>, which by default (on load) displays a value of 5.</p>
<p><strong>User Story #6:</strong> I can see an element with a corresponding <code>id="session-length"</code>, which by default displays a value of 25.</p>
<p><strong>User Story #7:</strong> I can see an element with a corresponding <code>id="timer-label"</code>, that contains a string indicating a session is initialized (e.g. "Session").</p>
<p><strong>User Story #8:</strong> I can see an element with corresponding <code>id="time-left"</code>. NOTE: Paused or running, the value in this field should always be displayed in <code>mm:ss</code> format (i.e. 25:00).</p>
<p><strong>User Story #9:</strong> I can see a clickable element with a corresponding <code>id="start_stop"</code>.</p>
<p><strong>User Story #10:</strong> I can see a clickable element with a corresponding <code>id="reset"</code>.</p>
<p><strong>User Story #11:</strong> When I click the element with the id of <code>reset</code>, any running timer should be stopped, the value within <code>id="break-length"</code> should return to <code>5</code>, the value within <code>id="session-length"</code> should return to 25, and the element with <code>id="time-left"</code> should reset to its default state.</p>
<p><strong>User Story #12:</strong> When I click the element with the id of <code>break-decrement</code>, the value within <code>id="break-length"</code> decrements by a value of 1, and I can see the updated value.</p>
<p><strong>User Story #13:</strong> When I click the element with the id of <code>break-increment</code>, the value within <code>id="break-length"</code> increments by a value of 1, and I can see the updated value.</p>
<p><strong>User Story #14:</strong> When I click the element with the id of <code>session-decrement</code>, the value within <code>id="session-length"</code> decrements by a value of 1, and I can see the updated value.</p>
<p><strong>User Story #15:</strong> When I click the element with the id of <code>session-increment</code>, the value within <code>id="session-length"</code> increments by a value of 1, and I can see the updated value.</p>
<p><strong>User Story #16:</strong> I should not be able to set a session or break length to &lt;= 0.</p>
<p><strong>User Story #17:</strong> I should not be able to set a session or break length to &gt; 60.</p>
<p><strong>User Story #18:</strong> When I first click the element with <code>id="start_stop"</code>, the timer should begin running from the value currently displayed in <code>id="session-length"</code>, even if the value has been incremented or decremented from the original value of 25.</p>
<p><strong>User Story #19:</strong> If the timer is running, the element with the id of <code>time-left</code> should display the remaining time in <code>mm:ss</code> format (decrementing by a value of 1 and updating the display every 1000ms).</p>
<p><strong>User Story #20:</strong> If the timer is running and I click the element with <code>id="start_stop"</code>, the countdown should pause.</p>
<p><strong>User Story #21:</strong> If the timer is paused and I click the element with <code>id="start_stop"</code>, the countdown should resume running from the point at which it was paused.</p>
<p><strong>User Story #22:</strong> When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of <code>timer-label</code> should display a string indicating a break has begun.</p>
<p><strong>User Story #23:</strong> When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the <code>id="break-length"</code> element.</p>
<p><strong>User Story #24:</strong> When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of <code>timer-label</code> should display a string indicating a session has begun.</p>
<p><strong>User Story #25:</strong> When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the <code>id="session-length"</code> element.</p>
<p><strong>User Story #26:</strong> When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 <code>audio</code> tag and have a corresponding <code>id="beep"</code>.</p>
<p><strong>User Story #27:</strong> The audio element with <code>id="beep"</code> must be 1 second or longer.</p>
<p><strong>User Story #28:</strong> The audio element with id of <code>beep</code> must stop playing and be rewound to the beginning when the element with the id of <code>reset</code> is clicked.</p>

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flex
- Grid
- Desktop-first workflow
- React

## What I learned

I learned how to use localStorage to handle setting values and how to use context API to handle state between components. I also use hooks to control state in React. It turned out to be an amazing experience.
