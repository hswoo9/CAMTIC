package egovframework.com.devjitsu.system.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.system.repository.CommonCodeRepository;
import egovframework.com.devjitsu.system.service.CommonCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
}
