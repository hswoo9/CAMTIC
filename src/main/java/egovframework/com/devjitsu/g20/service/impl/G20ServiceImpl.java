package egovframework.com.devjitsu.g20.service.impl;

import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.g20.service.G20Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class G20ServiceImpl implements G20Service {

    @Autowired
    private G20Repository g20Repository;

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return g20Repository.getProjectList(params);
    }
}
