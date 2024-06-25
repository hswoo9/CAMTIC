package egovframework.com.devjitsu.inside.recruit.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.recruit.repository.EvalManageRepository;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class EvalManageServiceImpl implements EvalManageService {

    private static final Logger logger = LoggerFactory.getLogger(EvalManageServiceImpl.class);

    @Autowired
    private EvalManageRepository evalManageRepository;

    @Override
    public List<Map<String, Object>> getEvalItemMainList(Map<String, Object> params) {
        return evalManageRepository.getEvalItemMainList(params);
    }

    @Override
    public void setInEvalRegCopy(Map<String, Object> params) {
        String[] mainId = params.get("evalItemMainId").toString().split(",");
        for(String id : mainId){
            Map<String, Object> copyMap = new HashMap<>();
            copyMap.put("empSeq", params.get("empSeq"));
            copyMap.put("copyId", id);
            evalManageRepository.setEvalItemMainCopy(copyMap);
            evalManageRepository.setInEvalItemCopy(copyMap);
        }
    }

    @Override
    public void setEvalItemActiveUpd(Map<String, Object> params) {
        evalManageRepository.setEvalItemActiveUpd(params);
    }

    @Override
    public void setEvalItemMain(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> evalItemArr = gson.fromJson((String) params.get("evalItemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(StringUtils.isEmpty(params.get("evalItemMainId"))){
            evalManageRepository.setEvalItemMain(params);
        }else{
            evalManageRepository.setEvalItemMainUpd(params);
        }

        evalManageRepository.setEvalItemDel(params);
        params.put("evalItemArr", evalItemArr);
        evalManageRepository.setEvalItem(params);
    }

    @Override
    public Map<String, Object> getEvalItemMain(Map<String, Object> params) {
        Map<String, Object> returnMap = evalManageRepository.getEvalItemMain(params);
        returnMap.put("itemList", evalManageRepository.getEvalItem(params));

        return returnMap;
    }

    @Override
    public Map<String, Object> getRecruitEvalSelSheet(Map<String, Object> params) {
        return evalManageRepository.getRecruitEvalSelSheet(params);
    }

    @Override
    public Map<String, Object> evalLoginChk(Map<String, Object> params) {
        return evalManageRepository.evalLoginChk(params);
    }

    @Override
    public String setEvalSelection(Map<String, Object> params) {
        String[] evalEmpSeq = params.get("evalEmpSeq").toString().split(",");
        String duplicationTxt = "";

        for(int i = 0; i < evalEmpSeq.length; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("recruitInfoSn", params.get("recruitInfoSn"));
            map.put("recruitAreaInfoSn", params.get("recruitAreaInfoSn"));
            map.put("evalType", params.get("evalType"));
            map.put("evalEmpSeq", evalEmpSeq[i]);

            Map<String, Object> checkedMap = evalManageRepository.evalLoginChk(map);
            if(checkedMap == null){
                map.put("empSeq", params.get("empSeq"));
                map.put("evalEmpSeq", evalEmpSeq[i]);

                evalManageRepository.setEvalSelection(map);
            }else{
                duplicationTxt += ", " + checkedMap.get("EMP_NAME_KR");
            }
        }

        return duplicationTxt != "" ? duplicationTxt.substring(2) : "";
    }

    @Override
    public Map<String, Object> setEvalSelectionEmpSeq(Map<String, Object> params) {
        Map<String, Object> checkedMap = evalManageRepository.evalLoginChk(params);
        Map<String, Object> returnMap = new HashMap<>();
        boolean flag = false;

        if(checkedMap == null){
            evalManageRepository.setEvalSelectionEmpSeq(params);
            returnMap = evalManageRepository.evalLoginChk(params);
            flag = true;
        }else{
            returnMap = evalManageRepository.evalLoginChk(params);
            if(checkedMap.get("EVAL_STATUS").equals("P")){
                flag = true;
            }else{
                returnMap.put("message", "심사평가 종료된 평가위원입니다.");
            }
        }
        returnMap.put("flag", flag);

        return returnMap;
    }

    @Override
    public void setRecruitEvalSelSheet(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("recruitEvalSheetId"))){
            evalManageRepository.setRecruitEvalSelSheet(params);
        }else{
            evalManageRepository.setRecruitEvalSelSheetUpd(params);
        }
    }

    @Override
    public List<Map<String, Object>> getApplicationScreenViewList(Map<String, Object> params) {
        return evalManageRepository.getApplicationScreenViewList(params);
    }

    @Override
    public List<Map<String, Object>> getApplicationInterViewList(Map<String, Object> params) {
        return evalManageRepository.getApplicationInterViewList(params);
    }

    @Override
    public List<Map<String, Object>> getApplicationCountH(Map<String, Object> params) {
        return evalManageRepository.getApplicationCountH(params);
    }


}
