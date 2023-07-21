package egovframework.com.devjitsu.hp.board.service.impl;


import egovframework.com.devjitsu.hp.board.repository.BoardRepository;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.Pagination;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public PagingResponse<PostResponse> selectBoardList(ArticlePage articlePage) {
        int count = (int) boardRepository.selectBoardListCount(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        List<PostResponse> list = boardRepository.selectBoardList(articlePage);

        return new PagingResponse<>(list, pagination);
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

    @Override
    public void setBoardArticleViewCount(Map<String, Object> params) { boardRepository.setBoardArticleViewCount(params); }
}
