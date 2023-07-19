package egovframework.com.devjitsu.hp.board.service.impl;


import egovframework.com.devjitsu.hp.board.repository.BoardRepository;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public List<Map<String, Object>> selectBoardList(Map<String, Object> params) {
        return boardRepository.selectBoardList(params);
    }

    @Override
    public Map<String, Object> selectBoard(Map<String, Object> params) {
        return boardRepository.selectBoard(params);
    }

    @Override
    public void insertBoard(Map<String, Object> params) {
        boardRepository.insertBoard(params);
    }

    @Override
    public void updateBoard(Map<String, Object> params) {
        boardRepository.updateBoard(params);
    }

    @Override
    public void deleteBoard(Map<String, Object> params) {
        boardRepository.deleteBoard(params);
    }
}
