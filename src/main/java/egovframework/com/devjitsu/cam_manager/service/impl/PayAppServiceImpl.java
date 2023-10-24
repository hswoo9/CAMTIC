package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PayAppServiceImpl implements PayAppService {

    @Autowired
    private PayAppRepository payAppRepository;

    @Override
    public void payAppSetData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payAppSn")){
            payAppRepository.insPayAppData(params);
        } else {
            payAppRepository.updPayAppData(params);
            payAppRepository.delPayAppDetailData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("payAppSn", params.get("payAppSn"));
            payAppRepository.insPayAppDetailData(map);
        }

    }

    @Override
    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return payAppRepository.getPayAppReqData(params);
    }
}
