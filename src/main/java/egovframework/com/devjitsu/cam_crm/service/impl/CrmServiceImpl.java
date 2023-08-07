package egovframework.com.devjitsu.cam_crm.service.impl;

import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_crm.service.CrmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CrmServiceImpl implements CrmService {

    @Autowired
    private CrmRepository crmRepository;

    @Override
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {
        return crmRepository.getPopCrmList(params);
    }

    @Override
    public Map<String, Object> getCrmData(Map<String, Object> params) {
        return crmRepository.getCrmData(params);
    }
}
