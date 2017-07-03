
$(document).ready(function(){
	var twtmsg = 'Please write in a twitter hastag',
		normsg = 'Please write your sentence';

	$('select[name="msgtype"]').change(function(){
		if(this.value === "twitter"){
			$('textarea[name="msg"]').val(twtmsg);
		} else {
			$('textarea[name="msg"]').val(normsg);
		}
	});

	$('textarea[name="msg"]').focus(function(){
		$(this).removeClass('grey-text');

		if(this.value === twtmsg || this.value === normsg) {
			this.value = '';
		}
	});

	$('textarea[name="msg"]').blur(function(){
		$(this).removeClass('grey-text');

		if(this.value.replace(/\s+/g, '') === '') {
			this.value = $('select[name="msgtype"]').val() === 'twitter' ? twtmsg : normsg;
			 $(this).addClass('grey-text'); 
		}
	});

	$('textarea[name="msg"]').change(function(){ 
		if(this.value === twtmsg || this.value === normsg) { 
			return;
		}  

		this.value = this.value.split(' ').map(function(item){ 
			console.log(item);
			if(item.replace(/\s+/g, '') !== "" && !/^#/g.test(item)) { 
				return '#' + item; 
			}  
		}).join(' '); 
	});
});
