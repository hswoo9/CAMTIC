package egovframework.com.devjitsu.camtic.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.camtic.repository.ApplicationRepository;
import egovframework.com.devjitsu.camtic.repository.EvalRepository;
import egovframework.com.devjitsu.camtic.service.ApplicationService;
import egovframework.com.devjitsu.camtic.service.EvalService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EvalServiceImpl implements EvalService {

    @Autowired
    private EvalRepository evalRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public Map<String, Object> getEvalLogin(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();

        boolean flag = false;
        Map<String, Object> eval = evalRepository.getEvalLogin(params);
        if(eval != null){
            if(eval.get("EVAL_STATUS").equals("P")){
                flag = true;
            }else{
                returnMap.put("message", "심사평가 종료된 평가위원입니다.");
            }
        }

        returnMap.put("eval", eval);
        returnMap.put("flag", flag);

        return returnMap;
    }

    @Override
    public Map<String, Object> getApplicationScoreBoard(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("evalScoreBoard", evalRepository.getApplicationScoreBoard(params));

        if(params.get("evalScreenType").equals("in")){
            returnMap.putAll(evalRepository.getInEvalItemMain(params));
            returnMap.put("itemList", evalRepository.getInEvalItem(params));
        }

        return returnMap;
    }

    @Override
    public void setApplicationEvalScreen(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> evalArr = gson.fromJson((String) params.get("evalArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(evalArr.size() > 0){
            Map<String, Object> delMap = new HashMap<>();
            for(Map<String, Object> map : evalArr){
                delMap.put("evalLoginId", map.get("evalLoginId"));
                if(map.get("evalLoginId").equals(delMap.get("evalLoginId")) && !map.get("applicationId").equals(delMap.get("applicationId"))){
                    delMap.put("applicationId", map.get("applicationId"));
                    delMap.put("evalScreenType", map.get("evalScreenType"));

                    evalRepository.setApplicationEvalScreenDel(delMap);
                }
            }

            params.put("evalArr", evalArr);
            evalRepository.setApplicationEvalScreen(params);
        }
    }

    @Override
    public Map<String, Object> setEvalEnd(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        boolean chk = evalRepository.setEvalEndChk(params);
        returnMap.put("chk", chk);

        if(chk){
            evalRepository.setEvalEndUpd(params);
        }

        return returnMap;
    }
}
