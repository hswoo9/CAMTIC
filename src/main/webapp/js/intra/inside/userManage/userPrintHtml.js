const userPrintHtml = {
    html1 : function(list){
        let html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">'
        html += '   <tr>'
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">'
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">'
        html += '               <tr>'
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣학력사항</b></p></td>'
        html += '               </tr>'
        html += '               <tr>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>번호</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 148px;"><p style="font-size:12px;"><b>기 간</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 300px;"><p style="font-size:12px;"><b>학교 및 학과</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>구분</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>비고</b></p></td>'
        html += '               </tr>';

        for(let i=0;  i < 2; i++){
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '1' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '1992.03.02~1995.02.17' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '전주 중앙여자 고등학교' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '졸업' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '' +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    },

    html2 : function(){
        let html = '';

        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">'
        html += '   <tr>'
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">'
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">'
        html += '               <tr>'
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>▣경력사항</b></p></td>'
        html += '               </tr>'
        html += '               <tr>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 60px;"><p style="font-size:12px;"><b>1</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 148px;"><p style="font-size:12px;"><b>2</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 300px;"><p style="font-size:12px;"><b>3</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>4</b></p></td>'
        html += '                   <td style="height:30px;background-color:#FFE0E0; text-align:center; width: 100px;"><p style="font-size:12px;"><b>5</b></p></td>'
        html += '               </tr>';

        for(let i=0;  i < 2; i++){
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '1' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '2' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '3' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '4' +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ '5' +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html;
    }
}