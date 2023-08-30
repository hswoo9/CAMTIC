package egovframework.com.devjitsu.test.controller;

import egovframework.com.devjitsu.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class TestController {

    @Autowired
    private TestService testService;
}
