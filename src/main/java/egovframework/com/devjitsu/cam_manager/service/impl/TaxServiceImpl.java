package egovframework.com.devjitsu.cam_manager.service.impl;

import egovframework.com.devjitsu.cam_manager.repository.TaxRepository;
import egovframework.com.devjitsu.cam_manager.service.TaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TaxServiceImpl implements TaxService {

    @Autowired
    private TaxRepository taxRepository;

    @Override
    public List<Map<String, Object>> getTaxList(Map<String, Object> params) {
        return taxRepository.getTaxList(params);
    }
}
