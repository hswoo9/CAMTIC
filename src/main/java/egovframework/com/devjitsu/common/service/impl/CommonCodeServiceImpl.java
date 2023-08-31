package egovframework.com.devjitsu.common.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.common.repository.CommonCodeRepository;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommonCodeServiceImpl implements CommonCodeService {

    private static final Logger logger = LoggerFactory.getLogger(CommonCodeServiceImpl.class);

    @Autowired
    private CommonCodeRepository commonCommonCodeRepository;

    @Override
    public List<Map<String, Object>> getCmCodeList(Map<String, Object> params) {
        if(!StringUtils.isEmpty(params.get("searchType")) && params.get("searchType").equals("1")){
            Gson gson = new Gson();
            List<String> cmGroupCodeId = gson.fromJson((String) params.get("cmGroupCodeId"),new TypeToken<List<String>>(){}.getType());
            params.put("cmGroupCodeId", cmGroupCodeId);
        }

        return commonCommonCodeRepository.getCmCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getCustomCodeList(Map<String, Object> params) {
        return commonCommonCodeRepository.getCustomCodeList(params);
    }

    @Override
    public String getHwpCtrlUrl(String achrGbn) {
        return commonCommonCodeRepository.getHwpCtrlUrl(achrGbn);
    }

    @Override
    public Map<String, Object> getCmCodeInfo(Map<String, Object> params) {
        return commonCommonCodeRepository.getCmCodeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCmGroupCodeList(Map<String, Object> params) {
        return commonCommonCodeRepository.getCmGroupCodeList(params);
    }

    @Override
    public Map<String, Object> getCmGroupCodeInfo(Map<String, Object> params) {
        return commonCommonCodeRepository.getCmGroupCodeInfo(params);
    }

    @Override
    @Transactional
    public Map<String, Object> setCmGroupCodeSave(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            if(StringUtils.isEmpty(params.get("cmGroupCodeId"))){
                commonCommonCodeRepository.setCmGroupCodeSave(params);
            }else{
                commonCommonCodeRepository.setCmGroupCodeUpdate(params);
            }

            result.put("code", "200");
            result.put("message", "공통 그룹코드 설정이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "공통 그룹코드 설정 저장 중 에러가 발생했습니다.");
        }

        return result;
    }

    @Override
    @Transactional
    public Map<String, Object> setCmCodeSave(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            if(StringUtils.isEmpty(params.get("cmCodeId"))){
                commonCommonCodeRepository.setCmCodeSave(params);
            }else{
                commonCommonCodeRepository.setCmCodeUpdate(params);
            }

            result.put("code", "200");
            result.put("message", "공통코드 설정이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "공통코드 설정 저장 중 에러가 발생했습니다.");
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> commonCodeList(Map<String, Object> params) {
        return commonCommonCodeRepository.getCmCodeList(params);
    }
}
