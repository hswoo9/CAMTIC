(function($){
	var $WIN=$(window);		// window jQuery object
	var $DOC=$(document);	// document jQuery object

	function gnb(){

        var gnb_fml_timer;
        $DOC.on('click','.gnb_fml>a:first',function(e){
            e.preventDefault();
            var $this=$(this);
            var $gnb_fml=$this.parent();
            if($gnb_fml.hasClass('on')){
                clearTimeout(gnb_fml_timer);
                $gnb_fml.removeClass('on');
                gnb_fml_timer=setTimeout(function(){
                    $this.siblings('a').css('display','none');
                },400);
            }else{
                clearTimeout(gnb_fml_timer);
                $gnb_fml.addClass('on');
                $this.siblings('a').css('display','block');
            }
        });

	}
	
	$WIN.on('load',function(){
		gnb();
	});
})(jQuery);


(function($){
	var $WIN=$(window);		// window jQuery object
	var $DOC=$(document);	// document jQuery object

	function gnb(){

        var gnb_fml_timer;
        $DOC.on('click','.fnb_fml>a:first',function(e){
            e.preventDefault();
            var $this=$(this);
            var $gnb_fml=$this.parent();
            if($gnb_fml.hasClass('on')){
                clearTimeout(gnb_fml_timer);
                $gnb_fml.removeClass('on');
                gnb_fml_timer=setTimeout(function(){
                    $this.siblings('a').css('display','none');
                },400);
            }else{
                clearTimeout(gnb_fml_timer);
                $gnb_fml.addClass('on');
                $this.siblings('a').css('display','block');
            }
        });

	}
	
	$WIN.on('load',function(){
		gnb();
	});
})(jQuery);