package egovframework.com.devjitsu.system.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.MailUtil;
import egovframework.com.devjitsu.system.repository.MessageRepository;
import egovframework.com.devjitsu.system.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getStringMenuList(Map<String, Object> params) {
        List<Map<String, Object>> menuList = messageRepository.getMenuList(params);
        for(int i = 0 ; i < menuList.size() ; i++){
            List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
            params.put("userGroupId", menuList.get(i).get("GROUP_ID"));
            List<Map<String, Object>> menuListUser = messageRepository.getMenuListUser(params);
            for(int j = 0 ; j < menuListUser.size() ; j++){
                Map<String, Object> aa = new HashMap<String, Object>();
                aa.put("GROUP_ID", menuListUser.get(j).get("GROUP_ID"));
                aa.put("PHONE_USER_ID", menuListUser.get(j).get("PHONE_USER_ID"));
                aa.put("GROUP_NAME", menuListUser.get(j).get("GROUP_NAME"));
                aa.put("PHONE_USER_NAME", menuListUser.get(j).get("PHONE_USER_NAME"));
                aa.put("PHONE_USER_NUM", menuListUser.get(j).get("PHONE_USER_NUM"));
                result.add(aa);
            }
            menuList.get(i).put("items",  new ArrayList<>(result));
        }

        return menuList;
    }

    @Override
    public List<Map<String, Object>> getMessageHistList(Map<String, Object> params) {
        return messageRepository.getMessageHistList(params);
    }

    @Override
    public List<Map<String, Object>> getMailHistList(Map<String, Object> params) {
        return messageRepository.getMailHistList(params);
    }

    @Override
    public Map<String, Object> getMailHistData(Map<String, Object> params) {
        Map<String, Object> result = messageRepository.getMailHistData(params);
        return result;
    }

    @Override
    public List<Map<String, Object>> getMailDetList(Map<String, Object> params) {
        return messageRepository.getMailDetList(params);
    }


    @Override
    @Transactional
    public void msgSend(Map<String, Object> params) {
        /** 콘텐츠 바이트 크기 구하기 */
        int length = getByteLength(params.get("msg_content"));
        System.out.println("msg content length : " + length + " Bytes");

        if(!params.containsKey("callBack")){
            params.put("callBack", "0632190300");
        }

        /** 만약 바이트가 80보다 작으면 SMS, 크면 MMS (둘이 건당 요금이 다름) */
        if(length < 80){
            messageRepository.msgSendSMS(params);
        }else{
            messageRepository.msgSendMMS(params);
        }
    }


    @Override
    @Transactional
    public void setGroup(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("groupId"))){
            messageRepository.setGroup(params);
        }
    }

    @Override
    @Transactional
    public void setGroupMod(Map<String, Object> params) {
        try{
            messageRepository.setGroupMod(params);
        }catch(Exception e){
            System.out.println("실패");
            e.printStackTrace();
        }
    }

    @Override
    public void setGroupDel(Map<String, Object> params) {
        messageRepository.setGroupDel(params);
    }

    @Override
    @Transactional
    public void setUser(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("phoneUserId"))){
            messageRepository.setUser(params);
        }
    }

    @Override
    @Transactional
    public void setUserMod(Map<String, Object> params) {
        try{
            messageRepository.setUserMod(params);
        }catch(Exception e){
            System.out.println("실패");
            e.printStackTrace();
        }
    }

    @Override
    public void setUserDel(Map<String, Object> params) {
        messageRepository.setUserDel(params);
    }

    @Override
    public void setMailHist(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(!params.containsKey("mailHistSn")){
            messageRepository.setMailHistIns(params);
        } else {
            messageRepository.setMailHistUpd(params);
        }
    }

    @Override
    public void setMailDet(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("mailHistSn", params.get("mailHistSn"));
            messageRepository.setMailDetIns(map);
        }
    }

    @Override
    public void delMailDet(Map<String, Object> params) {
        messageRepository.setMailDetDel(params);
    }

    @Override
    public void setMailDetCom(Map<String, Object> params) {
        messageRepository.setMailDetCom(params);
    }

    private int getByteLength(Object strO) {
        try {
            String str = strO.toString();
            return str.getBytes("euc-kr").length;
        } catch (Exception e) {
            try {
                String str = strO.toString();
                return str.getBytes().length;
            } catch (Exception f) {
                f.printStackTrace();
            }
        }
        return 80;
    }

    @Override
    public void sendFms(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", "send");
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
                commonRepository.insFileInfoOne(list.get(i));
                params.put("fileUUID", list.get(i).get("fileUUID"));
                messageRepository.msgSendFMS(params);
            }
        }

    }

    @Override
    public void joiningAnnivSendMail(Map<String, Object> params, String SMTPServer, int SMTPPort, String SMTPID, String SMTPPW) {

        MailUtil mailUtil = new MailUtil();

        String rcvName = params.get("EMP_NAME_KR").toString();
        String rcvPosition = !params.get("DUTY_NAME").equals("") ? params.get("DUTY_NAME").toString() : params.get("POSITION_NAME").toString();

        params.put("receiveEml", params.get("EMAIL_ADDR").toString());
        params.put("sendEml", "camtic@camtic.or.kr");
        params.put("subject", "축하드립니다. " + rcvName + " " + rcvPosition + "님");
        params.put("contents", getAnnivMailContent(params));

        try {
            mailUtil.joiningAnnivSendMail(params, SMTPServer, SMTPPort, SMTPID, SMTPPW);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String getAnnivMailContent(Map<String, Object> params) {

        String rcvName = params.get("EMP_NAME_KR").toString();
        String rcvPosition = !params.get("DUTY_NAME").equals("") ? params.get("DUTY_NAME").toString() : params.get("POSITION_NAME").toString();
        int annivYear = Integer.parseInt(params.get("ANNIV_YEAR").toString());
        int annivYearDiv = Integer.parseInt(params.get("ANNIV_YEAR_DIV").toString());

        String mailContentImg = "";   // 이미지
        String mailContent = "";   // 내용

        if(annivYearDiv == 0){
            if(annivYear == 5) {
                // 5주년 - 5주년 이미지
                mailContentImg += "  <tr>";
                mailContentImg += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_5th.gif' width='567' height='118'></td>";
                mailContentImg += "  </tr>";
            } else {
                // 5주년 단위 - 평년 이미지
                mailContentImg += "  <tr>";
                mailContentImg += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_normal.gif' width='567' height='118'></td>";
                mailContentImg += "  </tr>";
            }

            mailContent += "<table width='567' border='0' cellspacing='0' cellpadding='0'>";
            mailContent += mailContentImg;
            mailContent += "  <tr>";
            mailContent += "    <td bgcolor='#B5C3C9'><table width='567' border='0' cellspacing='0' cellpadding='0'>";
            mailContent += "      <tr>";
            mailContent += "        <td width='60' bgcolor='#f1f2ec'> </td>";
            mailContent += "        <td bgcolor='#f1f2ec' style='line-height:25px; color: #005BAA;'><p> </p>";
            mailContent += "          <p><b>축하드립니다. " + rcvName + " " + rcvPosition + "님</b></p>";
            mailContent += "            </span>";
            mailContent += "          </p>";
            mailContent += "          <p>어느덧 캠틱 입사 <b><u>" + annivYear + "주년</u></b>을 맞이하신 걸 진심으로 축하드립니다<span lang='EN-US' xml:lang='EN-US'>.<br>";
            mailContent += "          </span>더불어 그동안의 노고에 진심으로 감사의 마음을 전합니다<span lang='EN-US' xml:lang='EN-US'>.</span></span> </p>";
            mailContent += "          <p>당신이 있기에 캠틱이 존재하며<span lang='EN-US' xml:lang='EN-US'>,<br>";
            mailContent += "            </span>당신의 존재와 역할로 캠틱이 더욱 빛이 난다고 생각합니다<span lang='EN-US' xml:lang='EN-US'>.</span>          </p>";
            mailContent += "          <p>매일매일 바쁘게 흘러가는 일상이지만<br>";
            mailContent += "            오늘만큼은 마음의 여유를 갖고<span lang='EN-US' xml:lang='EN-US'>,<br>";
            mailContent += "            </span>나 자신에게 격려와 칭찬을 듬뿍 보내주시면 좋겠습니다<span lang='EN-US' xml:lang='EN-US'>.</span></p>";
            mailContent += "          <p>다시 한번 입사 <span lang='EN-US' xml:lang='EN-US'><b><u>" + annivYear + "주년</u></b></span>을 축하드리며<span lang='EN-US' xml:lang='EN-US'>,<br>";
            mailContent += "            </span>앞으로도 늘 건강한 모습으로<br>";
            mailContent += "            캠틱과 함께 성장하고<span lang='EN-US' xml:lang='EN-US'>, </span>행복한 삶이 되시기를 기원합니다<span lang='EN-US' xml:lang='EN-US'>.</span></p>";
            mailContent += "          <p>감사합니다<span lang='EN-US' xml:lang='EN-US'>.</span></p>";
            mailContent += "          <p> </p>";
            mailContent += "          <table width='100%' border='0' cellspacing='0' cellpadding='0'>";
            mailContent += "            <tr>";
            mailContent += "              <td align='right' style='line-height:25px; color: #005BAA;'>노상흡 원장 배상 </td>";
            mailContent += "            </tr>";
            mailContent += "        </table>";
            mailContent += "          <p> </p></td>";
            mailContent += "        <td width='60' bgcolor='#f1f2ec'> </td>";
            mailContent += "      </tr>";
            mailContent += "    </table></td>";
            mailContent += "  </tr>";
            mailContent += "  <tr>";
            mailContent += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_5th2.gif' width='567' height='84'></td>";
            mailContent += "  </tr>";
            mailContent += "</table>";
            mailContent += "</body>";
            mailContent += "</html>";

        } else {
            if(annivYear == 1) {
                // 1주년
                mailContent += "<table width='567' border='0' cellspacing='0' cellpadding='0'>";
                mailContent += "  <tr>";
                mailContent += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_1st.gif' width='567' height='118'></td>";
                mailContent += "  </tr>";
                mailContent += "  <tr>";
                mailContent += "    <td bgcolor='#B5C3C9'><table width='567' border='0' cellspacing='0' cellpadding='0'>";
                mailContent += "      <tr>";
                mailContent += "        <td width='60' bgcolor='#eaf9ec'> </td>";
                mailContent += "        <td bgcolor='#eaf9ec' style='line-height:25px;  color: #874E4F;'><p> </p>";
                mailContent += "          <p><b>축하드립니다. " + rcvName + " " + rcvPosition + "님</b>";
                mailContent += "            </p>";
                mailContent += "            </b>";
                mailContent += "            </p>";
                mailContent += "            </p>";
                mailContent += "          <p>캠틱 입사 <span lang='EN-US' xml:lang='EN-US'>1</span>주년을 진심으로 축하드립니다<span lang='EN-US' xml:lang='EN-US'>.<br>";
                mailContent += "              1</span>년 동안 새로운 업무와 환경<span lang='EN-US' xml:lang='EN-US'>, </span>사람들과 적응해나가며<br>";
                mailContent += "            무척 바쁘게 달려오셨으리라 생각됩니다<span lang='EN-US' xml:lang='EN-US'>.</span>";
                mailContent += "            </p>";
                mailContent += "          </p>";
                mailContent += "          어찌보면 가장 힘들고 소중했을 시간 동안<br>";
                mailContent += "            정말 수고 많으셨습니다<span lang='EN-US' xml:lang='EN-US'>.</span></p>";
                mailContent += "          <p><span lang='EN-US' xml:lang='EN-US'>1</span>년 전 입사하던 날의 설레임과<br>";
                mailContent += "            새롭게 결심했던 마음들을 떠올리며<span lang='EN-US' xml:lang='EN-US'>,<br>";
                mailContent += "            </span>조금 더 성숙된 모습으로 내일을 향한 발걸음을 내딛었으면 합니다<span lang='EN-US' xml:lang='EN-US'>.</span></span></p>";
                mailContent += "          <p>입사 <span lang='EN-US' xml:lang='EN-US'>1</span>주년을 다시 한번 축하드리며<span lang='EN-US' xml:lang='EN-US'>,</span><br>";
                mailContent += "            늘 건강한 모습으로 캠틱과 함께 성장해 나가며<span lang='EN-US' xml:lang='EN-US'>,</span><br>";
                mailContent += "            행복한 삶이 되시기를 기원합니다<span lang='EN-US' xml:lang='EN-US'>.</span>          </p>";
                mailContent += "          <p>감사합니다<span lang='EN-US' xml:lang='EN-US'>.</span></p>";
                mailContent += "          <p> </p>";
                mailContent += "          <table width='100%' border='0' cellspacing='0' cellpadding='0'>";
                mailContent += "            <tr>";
                mailContent += "              <td align='right' style='line-height:25px; color:  #874E4F;'>노상흡 원장 배상 </td>";
                mailContent += "            </tr>";
                mailContent += "          </table>";
                mailContent += "          <p> </p></td>";
                mailContent += "        <td width='50' bgcolor='#eaf9ec'> </td>";
                mailContent += "      </tr>";
                mailContent += "    </table></td>";
                mailContent += "  </tr>";
                mailContent += "  <tr>";
                mailContent += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_1st2.gif' width='567' height='84'></td>";
                mailContent += "  </tr>";
                mailContent += "</table>";
                mailContent += "</body>";
                mailContent += "</html>";
                mailContent += "";
            } else {
                // 평년
                mailContent += "<table width='567' border='0' cellspacing='0' cellpadding='0'>";
                mailContent += "  <tr>";
                mailContent += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_normal.gif' width='567' height='118'></td>";
                mailContent += "  </tr>";
                mailContent += "  <tr>";
                mailContent += "    <td bgcolor='#B5C3C9'><table width='567' border='0' cellspacing='0' cellpadding='0'>";
                mailContent += "      <tr>";
                mailContent += "        <td width='60' bgcolor='#f5fbfd'> </td>";
                mailContent += "        <td bgcolor='#f5fbfd' style='line-height:25px; color:#375F8E'><p> </p>";
                mailContent += "          <p><b>축하드립니다. " + rcvName + " " + rcvPosition + "님</b>";
                mailContent += "            </p>";
                mailContent += "            <span></b>";
                mailContent += "          </p>";
                mailContent += "            </span>";
                mailContent += "            <p><span>";
                mailContent += "              캠틱 입사 <b><u><span lang='EN-US' xml:lang='EN-US'>" + annivYear + "</span>주년</u></b>을 진심으로 축하드립니다<span lang='EN-US' xml:lang='EN-US'>";
                mailContent += "                .<br>";
                mailContent += "                </span>더불어 <b><u>" + rcvName + " " + rcvPosition + "님</u></b>의 노고에 진심으로 감사의 마음을 전합니다<span lang='EN-US' xml:lang='EN-US'>.</span></span>";
                mailContent += "            </p>";
                mailContent += "                                        <p><span>";
                mailContent += "                                          하루하루 바삐 흘러가는 시간 속에서<br>";
                mailContent += "                                          입사기념일을 맞아 오늘은 나에게 칭찬과 격려를<br>";
                mailContent += "                                          보내보는 것은 어떨런지요<span lang='EN-US' xml:lang='EN-US'>";
                mailContent += "                                              ?<br>";
                mailContent += "                                          </span>남이 알아주는 칭찬과 인정도 좋지만<br>";
                mailContent += "                                          오늘만은 나를 위한 인정과 격려를 듬뿍 보내주셨으면 합니다<span lang='EN-US' xml:lang='EN-US'>.</span></span>";
                mailContent += "                                        </p>";
                mailContent += "                                        <p><span>";
                mailContent += "                                          더불어 입사하던 날의 설레임과<br>";
                mailContent += "                                          초심을 다시 한번 떠올리며<span lang='EN-US' xml:lang='EN-US'>";
                mailContent += "                                              ,<br>";
                mailContent += "                                          </span>마음의 여유를 가지고 다시금 힘찬 발걸음을 내딛었으면 합니다<span lang='EN-US' xml:lang='EN-US'>.</span></span>";
                mailContent += "                                        </p>";
                mailContent += "                                        <p><span>";
                mailContent += "                                          입사 <b><u><span lang='EN-US' xml:lang='EN-US'>" + annivYear + "</span>주년</u></b>을 다시 한번 축하드리며<span lang='EN-US' xml:lang='EN-US'>";
                mailContent += "                                              ,<br>";
                mailContent += "                                          </span>늘 캠틱 안에서 건강과 행복이 함께하는 삶이 되시기 바랍니다<span lang='EN-US' xml:lang='EN-US'>.</span></span>";
                mailContent += "                                        </p>";
                mailContent += "            <p>감사합니다<span lang='EN-US' xml:lang='EN-US'>.</span></p>";
                mailContent += "            <p> </p>";
                mailContent += "            <table width='100%' border='0' cellspacing='0' cellpadding='0'>";
                mailContent += "              <tr>";
                mailContent += "                <td align='right' style='line-height:25px; color: #375F8E'>노상흡 원장 배상 </td>";
                mailContent += "              </tr>";
                mailContent += "            </table>";
                mailContent += "          <p>　</td>";
                mailContent += "        <td width='60' bgcolor='#f5fbfd'> </td>";
                mailContent += "      </tr>";
                mailContent += "    </table></td>";
                mailContent += "  </tr>";
                mailContent += "  <tr>";
                mailContent += "    <td><img src='http://camtic.or.kr/CAMsPot/Etc/anniversary/an_normal2.gif' width='567' height='84'></td>";
                mailContent += "  </tr>";
                mailContent += "</table>";
                mailContent += "</body>";
                mailContent += "</html>";
                mailContent += "";
            }
        }

        return mailContent;
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);
        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";
        return path;
    }
}
