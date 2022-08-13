DROP VIEW IF EXISTS v_question;
CREATE VIEW v_question AS with tmp as (
    select question_id,
        array_agg(tag.id::string || '::' || tag.name) as tag
    from question_tag
        left join tag on question_tag.tag_id = tag.id
    group by question_id
)
select question.id,
    question.type,
    question.content,
    question.answer,
    question.user_id,
    question.date_created,
    question.date_updated,
    tmp.tag
from question
    left join tmp on question.id = tmp.question_id;