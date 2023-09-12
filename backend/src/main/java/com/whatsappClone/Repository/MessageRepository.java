package com.whatsappClone.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.whatsappClone.Model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query("select m from Message m join m.chat c where c.id=:chatId")
    public List<Message> findByChatId(@Param("chatId") Integer chatId);
}
