function trackShipment(){
  const code=document.getElementById('trackingCode').value.trim();
  const result=document.getElementById('trackingResult');
  if(!code){result.textContent='Please enter a tracking code.';return;}
  result.textContent='Tracking system demo: shipment code '+code+' received. Connect a real tracking database to show live status.';
}
function sendEmail(e){
  e.preventDefault();
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const subject=document.getElementById('subject').value;
  const message=document.getElementById('message').value;
  const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message);
  window.location.href='mailto:uzorchik3600@gmail.com?subject='+encodeURIComponent(subject)+'&body='+body;
}
