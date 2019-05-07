  fetch("/picture")
    .then (function(response) {
      return response.json();
    })
    .then (function(data) {
      var apiSplitData = data.split('&');
      console.log('data is : ', apiSplitData);
      var imgTitle = apiSplitData[0];
      console.log('the image title : ', imgTitle);
      var imgUrl = apiSplitData[1];
      console.log('the image url is : ', imgUrl);
      var imgStatus = apiSplitData[2];
      console.log('the image status is : ', imgStatus);
      var explanation = apiSplitData[3];
      console.log('the explanation is : ', explanation);
      // Set the title
      var h1 = document.getElementById('formHeader');
      var title = document.createTextNode(imgTitle);
      h1.appendChild(title);
      // Set the background
      if (imgStatus === true) {
        document.body.style.background = 'url('+imgUrl+')';
      } else {
        document.body.style.background = `url('http://www.adwonline.ae/wp-content/uploads/2017/04/space-005.jpg')`
      }
      // Set the explanation box over the title
      const toolTipBox = document.createElement("div");
      toolTipBox.id = "ttId";
      toolTipBox.style.visibility = "hidden";
      toolTipBox.position = "fixed";
      document.body.appendChild(toolTipBox);
      const ttTurnOn = ((evt) => {
        const boundBox = evt.target.getBoundingClientRect();
      })
      toolTipBox.textContent = explanation;
      toolTipBox.style.visibility = "visible";
      const ttTurnOff = ((evt) => {toolTipBox.style.visibility = "hidden";});
      const hoverEle = document.getElementById("formHeader");
      hoverEle.addEventListener("mouseover", ttTurnOn, false);
      hoverEle.addEventListener("mouseout", ttTurnOff, false);
      document.getElementById("ttId").addEventListener("click", ttTurnOff, false);

    })
    .catch(function(err) {
      console.log(err);
    })
