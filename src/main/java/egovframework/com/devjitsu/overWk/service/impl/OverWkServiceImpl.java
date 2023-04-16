package egovframework.com.devjitsu.overWk.service.impl;

import egovframework.com.devjitsu.overWk.repository.OverWkRepository;
import egovframework.com.devjitsu.overWk.service.OverWkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OverWkServiceImpl implements OverWkService {

    @Autowired
    private OverWkRepository overWkRepository;
    @Override
    public List<Map<String, Object>> getWorkCodeList(Map<String, Object> params) {
        return overWkRepository.getWorkCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getOverWorkPlanReqList(Map<String, Object> params) {
        return overWkRepository.getOverWorkPlanReqList(params);
    }
}
