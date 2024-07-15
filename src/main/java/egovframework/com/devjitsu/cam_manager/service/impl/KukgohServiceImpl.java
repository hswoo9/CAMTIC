package egovframework.com.devjitsu.cam_manager.service.impl;


import egovframework.com.devjitsu.cam_manager.repository.KukgohRepository;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class KukgohServiceImpl implements KukgohService {

    @Autowired
    private KukgohRepository kukgohRepository;

    @Autowired
    private G20Repository g20Repository;


    @Override
    public List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params) {
        return kukgohRepository.getCmmnCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params) {
        return kukgohRepository.getCmmnCodeDetailList(params);
    }

    @Override
    public void setCommCodeObject(Map<String, Object> params) {

        kukgohRepository.delCommCodeObject(params);
        kukgohRepository.insCommCodeObject(params);
    }

    @Override
    public List<Map<String, Object>> getPayAppList(Map<String, Object> params) {
        return kukgohRepository.getPayAppList(params);
    }

    @Override
    public List<Map<String, Object>> getBudgetGroupList(Map<String, Object> params) {
        List<Map<String, Object>> list = g20Repository.getBudgetGroupList(params);

        for(Map<String, Object> item : list){
            Map<String, Object> map = kukgohRepository.getEnaraBudgetCdData(item);
            item.put("ASSTN_EXPITM_TAXITM_CODE", "");
            item.put("ASSTN_EXPITM_NM", "");
            item.put("ASSTN_TAXITM_NM", "");
            item.put("BG_SN", "");

            if(map != null){
                item.put("ASSTN_EXPITM_TAXITM_CODE", map.get("ASSTN_EXPITM_TAXITM_CODE"));
                item.put("ASSTN_EXPITM_NM", map.get("ASSTN_EXPITM_NM"));
                item.put("ASSTN_TAXITM_NM", map.get("ASSTN_TAXITM_NM"));
                item.put("BG_SN", map.get("BG_SN"));

            }
        }

        return list;
    }

    @Override
    public List<Map<String, Object>> getEnaraBudgetCdList(Map<String, Object> params) {
        return kukgohRepository.getEnaraBudgetCdList(params);
    }

    @Override
    public void setEnaraBudgetCode(Map<String, Object> params) {

        kukgohRepository.delEnaraBudgetCode(params);
        kukgohRepository.insEnaraBudgetCode(params);
    }

    @Override
    public void delBudgetCodeMatch(Map<String, Object> params) {

        kukgohRepository.delBudgetCodeMatch(params);
    }
}
