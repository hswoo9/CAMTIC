package egovframework.com.devjitsu.system.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.system.repository.MessageRepository;
import egovframework.com.devjitsu.system.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
        return messageRepository.getMailHistData(params);
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
    public void setMailHist(Map<String, Object> params, MultipartFile[] fileList, String server_dir, String base_dir) {
        if(!params.containsKey("mailHistSn")){
            messageRepository.setMailHist(params);
        } else {

        }

        if(fileList.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("mailHistSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", "mailHist");
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);
        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";
        return path;
    }
}
