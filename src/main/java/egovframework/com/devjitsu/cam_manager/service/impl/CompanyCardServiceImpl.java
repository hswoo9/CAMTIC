package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.CompanyCardRepository;
import egovframework.com.devjitsu.cam_manager.service.CompanyCardService;
import egovframework.com.devjitsu.inside.document.repository.DocumentRepository;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CompanyCardServiceImpl implements CompanyCardService {

    @Autowired
    private CompanyCardRepository companyCardRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<Map<String, Object>> cardUseList(Map<String, Object> params) {
        return companyCardRepository.cardUseList(params);
    }

    @Override
    public List<Map<String, Object>> cardAllList(Map<String, Object> params) {
        return companyCardRepository.cardAllList(params);
    }

    @Override
    public Map<String, Object> useCardDetailInfo(Map<String, Object> params) {

        Map<String, Object> resultMap = companyCardRepository.useCardDetailInfo(params);

        if(params.get("buySts").equals("01") && resultMap == null){
            params.put("buySts", "03");
            resultMap = companyCardRepository.useCardDetailInfo(params);
        } else if(params.get("buySts").equals("03") && resultMap == null){
            params.put("buySts", "01");
            resultMap = companyCardRepository.useCardDetailInfo(params);
        }

        if(params.containsKey("reqTypeZ")){
            List<Map<String, Object>> snackInfo =  documentRepository.getFileList(params);

            for(Map<String, Object> map : snackInfo) {
                String[] filePathArr = map.get("file_path").toString().split("/");

                if(filePathArr[3].equals(resultMap.get("AUTH_NO").toString()) && filePathArr[4].equals(resultMap.get("AUTH_DD").toString()) &&
                        filePathArr[5].equals(resultMap.get("AUTH_HH").toString()) && filePathArr[6].equals(resultMap.get("CARD_NO").toString()))
                {
                    resultMap.put("FILE_NO", map.get("file_no"));
                }
            }
        }

        return resultMap;
    }

    @Override
    public List<Map<String, Object>> getCardTOData(Map<String, Object> params) {
        return companyCardRepository.getCardTOData(params);
    }

    @Override
    public List<Map<String, Object>> getCardTOData2(Map<String, Object> params) {
        return companyCardRepository.getCardTOData2(params);
    }

    @Override
    public void saveRegCardTo(Map<String, Object> params) {
        companyCardRepository.saveRegCardTo(params);
    }

    @Override
    public void delCardTo(Map<String, Object> params) {
        companyCardRepository.delCardTo(params);
    }
    @Override
    public void delCardHist(Map<String, Object> params) {
        companyCardRepository.delCardHist(params);
    }

    @Override
    public Map<String, Object> getCardToInfo(Map<String, Object> params) {
        return companyCardRepository.getCardToInfo(params);
    }
    @Override
    public int getCardUseCheck(Map<String, Object> params) {
        return companyCardRepository.getCardUseCheck(params);
    }

    @Override
    public void updRegCardTo(Map<String, Object> params) {
        companyCardRepository.updRegCardTo(params);
    }

    @Override
    public void setUseCardHist(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> item : itemArr) {
            companyCardRepository.insUseCardHist(item);
        }
    }

    @Override
    public List<Map<String, Object>> cardToUseList(Map<String, Object> params) {
        return companyCardRepository.cardToUseList(params);
    }

    @Override
    public List<Map<String, Object>> getCardTOHistList(Map<String, Object> params) {
        return companyCardRepository.getCardTOHistList(params);
    }

    @Override
    public void updCardFromDe(Map<String, Object> params) {
        companyCardRepository.updCardFromDe(params);
    }

    @Override
    public void saveCardUserGroup(Map<String, Object> params) {
        int checkGroup = companyCardRepository.getCardUserGroupCheck(params);

        if(checkGroup > 0){
            companyCardRepository.updateCardUserGroup(params);
        }else{
            companyCardRepository.saveCardUserGroup(params);
        }
    }
    @Override
    public void saveCardUserGroupList(Map<String, Object> params) {
        int groupId = Integer.parseInt(String.valueOf(params.get("groupId")));

        // 1차적으로 전부 삭제
        companyCardRepository.delGroupUserAll(params);

        Gson gson = new Gson();
        List<Map<String, Object>> groupArr = gson.fromJson((String) params.get("groupArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : groupArr) {
            map.put("groupId", groupId);
            companyCardRepository.saveCardUserGroupList(map);
        }

    }
    @Override
    public void saveCardUserGroupSel(Map<String, Object> params) {
        int groupId = Integer.parseInt(String.valueOf(params.get("groupId")));

        Gson gson = new Gson();
        List<Map<String, Object>> groupArr = gson.fromJson((String) params.get("groupArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : groupArr) {
            map.put("groupId", groupId);
            companyCardRepository.saveCardUserGroupSel(map);
        }

    }

    @Override
    public void saveCardUserGroupSelCancle(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> groupArr = gson.fromJson((String) params.get("groupArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : groupArr) {

            companyCardRepository.saveCardUserGroupSelCancle(map);
        }

    }
    @Override
    public List<Map<String, Object>> getCardUserGroup(Map<String, Object> params) {
        return companyCardRepository.getCardUserGroup(params);
    }
    @Override
    public List<Map<String, Object>> getcardUserGroupList(Map<String, Object> params) {
        return companyCardRepository.getcardUserGroupList(params);
    }
    @Override
    public List<Map<String, Object>> getcardUserGroupSel(Map<String, Object> params) {
        return companyCardRepository.getcardUserGroupSel(params);
    }

    public List<Map<String, Object>> getCardGroupCheck(){
        return companyCardRepository.getCardGroupCheck();
    }

    @Override
    public void delCardUserGroup(Map<String, Object> params) {
        companyCardRepository.delCardUserGroup(params); // 그룹 삭제
        companyCardRepository.delCardUserGroupList(params); //그룹사용자 삭제
    }

    @Override
    public Map<String, Object> getCardUserGroupOne(Map<String, Object> param){
        return companyCardRepository.getCardUserGroupOne(param);
    }

    @Override
    public void delGroupUser(Map<String, Object> params) {
        companyCardRepository.delGroupUser(params);
    }

    @Override
    public void setPrivateCard(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("arr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : itemArr){
            if(params.get("stat").toString().equals("i")){
                if(map.get("USE_YN").toString().equals("Y")){
                    companyCardRepository.insPrivateCard(map);
                }
            } else {
                companyCardRepository.delPrivateCard(map);
            }

        }
    }

    @Override
    public void setCardManager(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("arr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : itemArr){
            map.put("MNG_SEQ", params.get("empSeq"));
            map.put("MNG_NAME", params.get("empName"));
            map.put("MNG_DEPT_SEQ", params.get("deptSeq"));
            map.put("MNG_DEPT_NAME", params.get("deptName"));


            Map<String, Object> tempMap = companyCardRepository.getCardManagerData(map);

            if(tempMap == null){
                companyCardRepository.insCardManager(map);
            } else {
                companyCardRepository.updCardManager(map);
            }
        }
    }

    @Override
    public void setCardHolder(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("arr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : itemArr){
            map.put("HOLDER_SEQ", params.get("empSeq"));
            map.put("HOLDER_NAME", params.get("empName"));
            map.put("HOLDER_DEPT_SEQ", params.get("deptSeq"));
            map.put("HOLDER_DEPT_NAME", params.get("deptName"));

            Map<String, Object> tempMap = companyCardRepository.getCardHolderData(map);

            if(tempMap == null){
                companyCardRepository.insCardHolder(map);
            } else {
                companyCardRepository.updCardHolder(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getCardAuthList(Map<String, Object> params) {
        return companyCardRepository.getCardAuthList(params);
    }

    @Override
    public List<Map<String, Object>> getCardAuthUserList(Map<String, Object> params) {
        return companyCardRepository.getCardAuthUserList(params);
    }

    @Override
    public void setCardAuthData(Map<String, Object> params) {
        companyCardRepository.setCardAuthData(params);
    }

    @Override
    public void delCardAuthData(Map<String, Object> params) {
        companyCardRepository.delCardAuthData(params);
    }

    @Override
    public void setCardAuthUserData(Map<String, Object> params) {
        companyCardRepository.setCardAuthUserData(params);
    }

    @Override
    public void delCardAuthUserData(Map<String, Object> params) {
        companyCardRepository.delCardAuthUserData(params);
    }


    @Override
    public void setMeetingData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> externalArr = gson.fromJson((String) params.get("externalArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(params.containsKey("metSn")){
            companyCardRepository.updMeetingData(params);
        } else {
            companyCardRepository.insMeetingData(params);
        }

        params.put("frKey", params.get("metSn"));

        companyCardRepository.updCardToByFrKey(params);


        for(Map<String, Object> extMap : externalArr){
            extMap.put("metSn", params.get("metSn"));
            companyCardRepository.insMeetingExternal(extMap);
        }

    }

    @Override
    public List<Map<String, Object>> getMeetingList(Map<String, Object> params) {
        return companyCardRepository.getMeetingList(params);
    }


    @Override
    public Map<String, Object> getMeetingData(Map<String, Object> params) {
        return companyCardRepository.getMeetingData(params);
    }

    @Override
    public List<Map<String, Object>> getExtData(Map<String, Object> params) {
        return companyCardRepository.getExtData(params);
    }

    @Override
    public void updateMeetingDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("metSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            companyCardRepository.updateMeetingApprStat(params);
        }else if("20".equals(docSts)) { // 중간결재
            companyCardRepository.updateMeetingApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            companyCardRepository.updateMeetingApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            companyCardRepository.updateMeetingFinalApprStat(params);
        }
    }

    @Override
    public Map<String, Object> getCardInfo(Map<String, Object> params) {
        return companyCardRepository.getCardInfo(params);
    }
}
