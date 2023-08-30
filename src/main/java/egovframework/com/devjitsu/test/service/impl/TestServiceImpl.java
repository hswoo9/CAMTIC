package egovframework.com.devjitsu.test.service.impl;

import egovframework.com.devjitsu.test.repository.TestRepository;
import egovframework.com.devjitsu.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

}
