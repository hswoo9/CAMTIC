package egovframework.com.devjitsu.inside.bustrip.service.impl;

import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BustripServiceImpl implements BustripService {

    @Autowired
    private BustripRepository bustripRepository;

    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return bustripRepository.getUserList(params);
    }
}
