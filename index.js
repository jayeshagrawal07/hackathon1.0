$(document).ready(function () {
  let socket = io();
  socket.on("connect", function () {
    socket.emit("start", { data: "I'm connected!" });
  });
  socket.on("bot-message", function (data) {
    addData(createBotMessage(data.message));
    if (data.isOption) {
      addData(createButtons(data.options));
    }
  });

  $("#send").click(function () {
    if ($("#send-input").val()) {
      addData(createUserMessage($("#send-input").val()));
      socket.emit("client-message", {
        select: false,
        message: $("#send-input").val(),
        select_data: "",
      });
      $("#send-input").val("");
    }
  });
});

function optionButtonClick(e, message) {
  console.log("message", message);
  addData(createUserMessage(message));
  $("button.option-btn").attr("disabled", true);
  socket.emit("client-message", {
    select: true,
    message: "",
    select_data: message,
  });
}

function createButtons(arr) {
  let buttons = `<div class="d-flex flex-wrap justify-content-center flex-row py-3"><DATA></div>`;
  let temp = buttons.split("<DATA>");
  let newButtons = temp[0];
  arr.forEach((item) => {
    let aTag = `<button class="btn btn-outline-success m-1 option-btn" onclick="optionButtonClick(this,'${item}')">`;
    newButtons += aTag + item + "</button>";
  });
  return newButtons + temp[1];
}

function createBotMessage(message) {
  return `<div class="d-flex justify-content-start flex-row py-3">
  <img src="./chatbot.png" width="25" height="25" />
  <div class="chat ml-2 p-3">${message}</div>
</div>`;
}

function createUserMessage(message) {
  return `<div class="d-flex justify-content-end flex-row py-3">
  <div class="bg-white mr-2 p-3">
    <span class="text-muted">${message}</span>
  </div>
  <img src="./user.png" width="30" height="30" />
</div>`;
}

function addData(element) {
  $("#message-container").append(element);
}
